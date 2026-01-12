import React, { useState, useEffect, useMemo } from 'react';
import './Bookings.css';
import apiService from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchPayments();
    fetchVehicles();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBookings();
      // Set all bookings to Confirmed status
      const confirmedBookings = data.map(b => ({
        ...b,
        status: 'Confirmed'
      }));
      setBookings(confirmedBookings);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const paymentData = await apiService.getPayments();
      setPayments(paymentData || []);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  const fetchVehicles = async () => {
    try {
      const v = await apiService.getVehicles();
      setVehicles(v || []);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  };

  const getPaymentForBooking = (bookingId) => {
    if (!bookingId || !payments || payments.length === 0) return '0.00';
    
    const bookingIdStr = bookingId.toString();
    
    const payment = payments.find(p => {
      if (!p.bookingId) return false;
      
      // bookingId might be an object (populated) or a string/ObjectId
      const paymentBookingId = typeof p.bookingId === 'object' ? p.bookingId._id : p.bookingId;
      const paymentBookingIdStr = paymentBookingId.toString();
      
      return paymentBookingIdStr === bookingIdStr;
    });
    
    if (payment && payment.amount) {
      return parseFloat(payment.amount).toFixed(2);
    }
    
    return '0.00';
  };

  const uniqueVehicles = useMemo(() => [...new Set(bookings.map(b => b.vehicle || b.carName).filter(Boolean))], [bookings]);

  // Apply filters with memoization
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      let ok = true;
      
      // Filter by date
      if (selectedDate) {
        const bookingDate = b.selectedDates?.[0] 
          ? new Date(b.selectedDates[0]).toISOString().split('T')[0] 
          : (b.date ? new Date(b.date).toISOString().split('T')[0] : '');
        if (bookingDate !== selectedDate) ok = false;
      }
      
      // Filter by vehicle
      if (selectedVehicle && (b.vehicle || b.carName) !== selectedVehicle) ok = false;
      
      return ok;
    });
  }, [bookings, selectedDate, selectedVehicle]);

  // Prepare data for upcoming orders chart (next 7 days) with memoization
  const upcomingOrdersData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const next7Days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      next7Days.push(date.toISOString().split('T')[0]);
    }

    return next7Days.map(date => {
      const count = bookings.filter(booking => {
        if (!booking.selectedDates || !Array.isArray(booking.selectedDates)) return false;
        return booking.selectedDates.some(d => {
          try {
            return new Date(d).toISOString().split('T')[0] === date;
          } catch {
            return false;
          }
        });
      }).length;
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        orders: count
      };
    });
  }, [bookings]);

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h2>📅 All Confirmed Bookings</h2>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Select Date:</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            {selectedDate && (
              <button className="clear-btn" onClick={() => setSelectedDate('')}>Clear</button>
            )}
          </div>

          <div className="filter-group">
            <label>Select Vehicle:</label>
            <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
              <option value="">All Vehicles</option>
              {uniqueVehicles.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && <p className="loading">Loading bookings...</p>}
      {error && <p className="error">{error}</p>}

      <div className="bookings-full-container">
        <div className="bookings-table-full">
          <h3>Complete Booking Database</h3>
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Booking Dates</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map(booking => (
                    <tr key={booking._id} className="booking-row">
                      <td>{booking.email || 'N/A'}</td>
                      <td>{booking.phone || booking.phoneNumber || 'N/A'}</td>
                      <td><span className="vehicle-badge">{booking.vehicle || booking.carName || 'N/A'}</span></td>
                      <td>
                        {booking.selectedDates && booking.selectedDates.length > 0
                          ? `${new Date(booking.selectedDates[0]).toLocaleDateString()} to ${new Date(booking.selectedDates[booking.selectedDates.length - 1]).toLocaleDateString()}`
                          : booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'
                        }
                      </td>
                      <td>{booking.address || '-'}</td>
                      <td>
                        <span className="status-badge confirmed">
                          ✓ {booking.status}
                        </span>
                      </td>
                      <td className="amount-cell"><strong>${getPaymentForBooking(booking._id)}</strong></td>
                      <td>{booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">No confirmed bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bookings-summary">
        <h3>Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <p className="summary-label">Total Confirmed Bookings</p>
            <p className="summary-value">{filteredBookings.length}</p>
          </div>
          <div className="summary-card">
            <p className="summary-label">Total Revenue</p>
            <p className="summary-value">
              ${filteredBookings.reduce((sum, b) => sum + (parseFloat(getPaymentForBooking(b._id)) || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="summary-card">
            <p className="summary-label">Unique Vehicles</p>
            <p className="summary-value">{uniqueVehicles.length}</p>
          </div>
          <div className="summary-card">
            <p className="summary-label">Unique Customers</p>
            <p className="summary-value">{new Set(filteredBookings.map(b => b.email)).size}</p>
          </div>
        </div>
      </div>

      <div className="upcoming-orders-chart">
        <h3>Upcoming Orders (Next 7 Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={upcomingOrdersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip 
              formatter={(value, name) => [`${value} orders`, 'Bookings']}
              labelStyle={{ color: '#000' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="#667eea" 
              strokeWidth={3}
              dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#667eea', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Bookings;
