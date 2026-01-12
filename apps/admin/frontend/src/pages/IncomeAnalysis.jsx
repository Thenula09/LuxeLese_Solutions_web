import React, { useState, useEffect } from 'react';
import './IncomeAnalysis.css';
import apiService from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const IncomeAnalysis = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicleBookingData, setVehicleBookingData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  useEffect(() => {
    fetchAnalysisData();
  }, []);

  const fetchAnalysisData = async () => {
    try {
      setLoading(true);
      
      const [bookingsData, paymentsData] = await Promise.all([
        apiService.getBookings(),
        apiService.getPayments()
      ]);
      
      setBookings(bookingsData || []);
      setPayments(paymentsData || []);
      
      // Process vehicle booking data for pie chart
      processVehicleData(bookingsData || []);
      
      // Get recent bookings (last 7 days)
      processRecentBookings(bookingsData || []);
      
    } catch (error) {
      console.error('Error fetching analysis data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processVehicleData = (bookingsData) => {
    const vehicleCounts = {};
    
    bookingsData.forEach(booking => {
      const vehicle = booking.vehicle || booking.carName || 'Unknown';
      vehicleCounts[vehicle] = (vehicleCounts[vehicle] || 0) + 1;
    });
    
    const chartData = Object.entries(vehicleCounts).map(([name, value]) => ({
      name,
      value,
      percentage: ((value / bookingsData.length) * 100).toFixed(1)
    }));
    
    setVehicleBookingData(chartData);
  };

  const processRecentBookings = (bookingsData) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recent = bookingsData
      .filter(booking => {
        const bookingDate = new Date(booking.createdAt || booking.date);
        return bookingDate >= sevenDaysAgo;
      })
      .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
      .slice(0, 10); // Show last 10 recent bookings
    
    setRecentBookings(recent);
  };

  const totalBookings = bookings.length;
  const totalIncome = payments.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);
  const averageBookingValue = totalBookings > 0 ? totalIncome / totalBookings : 0;

  return (
    <div className="income-page">
      <div className="analysis-header">
        <h2>📊 Income & Booking Analysis</h2>
      </div>

      {loading ? (
        <div className="loading">Loading analysis data...</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="analysis-summary">
            <div className="summary-card">
              <h3>Total Bookings</h3>
              <p className="summary-value">{totalBookings}</p>
              <p className="summary-label">Confirmed bookings</p>
            </div>
            
            <div className="summary-card">
              <h3>Total Income</h3>
              <p className="summary-value">${totalIncome.toFixed(2)}</p>
              <p className="summary-label">From all payments</p>
            </div>
            
            <div className="summary-card">
              <h3>Average Booking Value</h3>
              <p className="summary-value">${averageBookingValue.toFixed(2)}</p>
              <p className="summary-label">Per booking</p>
            </div>
            
            <div className="summary-card">
              <h3>Active Vehicles</h3>
              <p className="summary-value">{vehicleBookingData.length}</p>
              <p className="summary-label">With bookings</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <h3>📈 Bookings by Vehicle</h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={vehicleBookingData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {vehicleBookingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings Section */}
          <div className="recent-bookings-section">
            <h3>🕒 Recent Bookings (Last 7 Days)</h3>
            <div className="recent-bookings-table">
              <table className="analysis-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Booking Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length > 0 ? (
                    recentBookings.map(booking => {
                      const payment = payments.find(p => 
                        (p.bookingId?.toString() === booking._id?.toString()) ||
                        (p.bookingId === booking._id)
                      );
                      
                      return (
                        <tr key={booking._id}>
                          <td>{booking.customerName || booking.fullname || 'N/A'}</td>
                          <td>{booking.vehicle || booking.carName || 'N/A'}</td>
                          <td>{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td>${payment ? parseFloat(payment.amount).toFixed(2) : '0.00'}</td>
                          <td>
                            <span className={`status-badge ${booking.status?.toLowerCase() || 'pending'}`}>
                              {booking.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">No recent bookings in the last 7 days</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeAnalysis;