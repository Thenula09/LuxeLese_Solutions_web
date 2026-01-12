import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import apiService from '../services/api';
import { useSocket } from '../context/SocketContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [bookingStatusBreakdown, setBookingStatusBreakdown] = useState({});

  const socket = useSocket();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const handleDataUpdate = (data) => {
      console.log('Data updated:', data);
      fetchDashboardData();
    };
    
    if (socket) {
      socket.on('dataUpdated', handleDataUpdate);
      
      return () => {
        socket.off('dataUpdated', handleDataUpdate);
      };
    }
  }, [socket]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data with error handling
      let bookingsData = [];
      let paymentsData = [];
      let vehiclesData = [];
      
      try {
        bookingsData = await apiService.getBookings() || [];
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
      
      try {
        paymentsData = await apiService.getPayments() || [];
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
      
      try {
        vehiclesData = await apiService.getVehicles() || [];
      } catch (err) {
        console.error('Error fetching vehicles:', err);
      }
      
      setBookings(bookingsData);
      setPayments(paymentsData);
      setVehicles(vehiclesData);
      
      // Calculate total revenue with safe parsing
      const revenue = paymentsData.reduce((sum, p) => {
        const amount = parseFloat(p?.amount) || 0;
        return sum + amount;
      }, 0);
      setTotalRevenue(revenue);
      
      // Calculate total vehicles
      setTotalVehicles(vehiclesData.length);
      
      // Calculate unique customers with safe access
      const uniqueEmails = new Set(
        bookingsData
          .map(b => b?.email)
          .filter(email => email && typeof email === 'string')
      );
      setTotalCustomers(uniqueEmails.size);
      
      // Calculate booking status breakdown
      const statusCounts = bookingsData.reduce((acc, booking) => {
        const status = booking?.status || 'Pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
      setBookingStatusBreakdown(statusCounts);
      
      // Calculate monthly revenue
      calculateMonthlyRevenue(paymentsData);
      
      // Calculate daily revenue
      calculateDailyRevenue(paymentsData);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      // Set default values on error
      setBookings([]);
      setPayments([]);
      setVehicles([]);
      setTotalRevenue(0);
      setTotalVehicles(0);
      setTotalCustomers(0);
      setMonthlyRevenue([]);
      setDailyRevenue([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyRevenue = (paymentsData) => {
    const monthlyData = {};
    
    // Initialize last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      monthlyData[monthKey] = 0;
    }
    
    // Sum payments by month with safe access
    if (Array.isArray(paymentsData)) {
      paymentsData.forEach(payment => {
        if (payment?.date) {
          try {
            const paymentDate = new Date(payment.date);
            if (!isNaN(paymentDate.getTime())) {
              const monthKey = paymentDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
              if (monthlyData.hasOwnProperty(monthKey)) {
                const amount = parseFloat(payment.amount) || 0;
                monthlyData[monthKey] += amount;
              }
            }
          } catch (err) {
            console.warn('Error processing payment date:', payment.date, err);
          }
        }
      });
    }
    
    const monthlyArray = Object.entries(monthlyData).map(([month, value]) => ({ 
      month, 
      value: isNaN(value) ? 0 : value 
    }));
    setMonthlyRevenue(monthlyArray);
  };

  const calculateDailyRevenue = (paymentsData) => {
    const dailyData = {};
    
    // Initialize last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
      dailyData[dayKey] = 0;
    }
    
    // Sum payments by day with safe access
    if (Array.isArray(paymentsData)) {
      paymentsData.forEach(payment => {
        if (payment?.date) {
          try {
            const paymentDate = new Date(payment.date);
            if (!isNaN(paymentDate.getTime())) {
              const dayKey = paymentDate.toISOString().split('T')[0];
              if (dailyData.hasOwnProperty(dayKey)) {
                const amount = parseFloat(payment.amount) || 0;
                dailyData[dayKey] += amount;
              }
            }
          } catch (err) {
            console.warn('Error processing payment date:', payment.date, err);
          }
        }
      });
    }
    
    const dailyArray = Object.entries(dailyData).map(([date, value]) => ({ 
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: isNaN(value) ? 0 : value 
    }));
    setDailyRevenue(dailyArray);
  };

  const maxValue = monthlyRevenue.length > 0 ? Math.max(...monthlyRevenue.map(d => d?.value || 0)) : 1;
  
  // Get upcoming bookings (bookings with future dates)
  const getUpcomingBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return bookings.filter(booking => {
      if (!booking.selectedDates || booking.selectedDates.length === 0) return false;
      return booking.selectedDates.some(dateStr => {
        const bookingDate = new Date(dateStr);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate >= today;
      });
    }).slice(0, 6); // Show up to 6 upcoming bookings
  };
  
  const upcomingBookings = getUpcomingBookings();

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await apiService.deleteBooking(bookingId);
        fetchDashboardData(); // Refresh data after delete
      } catch (err) {
        console.error('Error deleting booking:', err);
        alert('Failed to delete booking');
      }
    }
  };

  if (loading && bookings.length === 0 && payments.length === 0 && vehicles.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="header-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="date-filters">
            <button>Day</button>
            <button>Week</button>
            <button className="active">Month</button>
            <button>Year</button>
          </div>
          <div className="date-range">📅 Live Updates</div>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card highlighted">
          <h3>Total Revenue</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
          <p className="stat-change">from {payments.length} payments</p>
        </div>
        
        <div className="stat-card">
          <h3>Active Rentals</h3>
          <p className="stat-value">{bookings.length}</p>
          <p className="stat-change">confirmed bookings</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Customers</h3>
          <p className="stat-value">{totalCustomers}</p>
          <p className="stat-change">unique customers</p>
        </div>
        
        <div className="stat-card">
          <h3>Fleet Size</h3>
          <p className="stat-value">{totalVehicles}</p>
          <p className="stat-change">total vehicles</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <h3>📊 Weekly Revenue Chart</h3>
          <div className="revenue-chart">
            <div className="chart-bars">
              {monthlyRevenue.map((data, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${maxValue > 0 ? (data.value / maxValue) * 100 : 0}%`,
                        backgroundColor: (data.value || 0) > 0 ? '#667eea' : '#e0e0e0'
                      }}
                      title={`${data.month || 'Unknown'}: $${(data.value || 0).toFixed(2)}`}
                    ></div>
                    <p className="bar-label">{data.month || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="chart-info">
              <p>Total: ${totalRevenue.toFixed(2)}</p>
              <p>Average: ${monthlyRevenue.length > 0 ? (totalRevenue / monthlyRevenue.length).toFixed(2) : '0.00'}</p>
            </div>
          </div>
        </div>

        <div className="daily-revenue-chart-section">
          <h3>📈 Daily Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
              <Line type="monotone" dataKey="value" stroke="#667eea" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="upcoming-bookings-section">
          <h3>📅 Upcoming Bookings</h3>
          <div className="bookings-cards-container">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking, index) => (
                <div 
                  key={booking._id || index} 
                  className="booking-card"
                  title="Click for more details"
                >
                  <div className="booking-card-header">
                    <h4>{booking.customerName || booking.fullname || 'N/A'}</h4>
                    <button 
                      className="delete-booking-btn"
                      onClick={() => handleDeleteBooking(booking._id)}
                      title="Delete this booking"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="booking-card-details">
                    <p><strong>Email:</strong> {booking.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {booking.phone || booking.phoneNumber || 'N/A'}</p>
                    <p><strong>Vehicle:</strong> <span className="vehicle-badge">{booking.vehicle || booking.carName || 'N/A'}</span></p>
                    <p><strong>Dates:</strong> {booking.selectedDates && booking.selectedDates.length > 0
                      ? `${new Date(booking.selectedDates[0]).toLocaleDateString()} - ${new Date(booking.selectedDates[booking.selectedDates.length - 1]).toLocaleDateString()}`
                      : booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'
                    }</p>
                    <p><strong>Duration:</strong> {booking.duration ? `${booking.duration} day${booking.duration > 1 ? 's' : ''}` : 'N/A'}</p>
                    <p><strong>Cost:</strong> ${booking.totalCost ? booking.totalCost.toFixed(2) : '0.00'}</p>
                    <p><strong>Status:</strong> <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                      {booking.status || 'Pending'}
                    </span></p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No upcoming bookings</p>
            )}
          </div>
        </div>
      </div>

      {loading && <p className="loading">Updating dashboard...</p>}
    </div>
  );
};

export default Dashboard;
