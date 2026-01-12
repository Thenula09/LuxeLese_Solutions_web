import React, { useState, useEffect } from 'react';
import './Users.css';
import apiService from '../services/api';

const Users = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers based on search term
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const bookings = await apiService.getBookings();
      
      // Extract unique customers from bookings
      const customerMap = new Map();
      
      bookings.forEach(booking => {
        const customerKey = booking.email || booking.customerName || booking.fullname;
        if (customerKey && !customerMap.has(customerKey)) {
          customerMap.set(customerKey, {
            id: booking._id,
            name: booking.customerName || booking.fullname || 'N/A',
            email: booking.email || 'N/A',
            phone: booking.phone || booking.phoneNumber || 'N/A',
            totalBookings: 1,
            lastBooking: booking.createdAt || booking.date
          });
        } else if (customerKey) {
          const existing = customerMap.get(customerKey);
          existing.totalBookings += 1;
          // Update last booking if this one is more recent
          const currentLast = new Date(existing.lastBooking);
          const thisBooking = new Date(booking.createdAt || booking.date);
          if (thisBooking > currentLast) {
            existing.lastBooking = booking.createdAt || booking.date;
          }
        }
      });
      
      const uniqueCustomers = Array.from(customerMap.values());
      setCustomers(uniqueCustomers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>👥 Customer Management</h2>
        <div className="users-stats">
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p className="stat-value">{customers.length}</p>
          </div>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading customers...</div>
      ) : (
        <div className="customers-grid">
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map(customer => (
              <div key={customer.id} className="customer-card">
                <div className="customer-card-header">
                  <h3>{customer.name}</h3>
                  <span className="booking-count">{customer.totalBookings} booking{customer.totalBookings > 1 ? 's' : ''}</span>
                </div>
                <div className="customer-card-details">
                  <p><strong>Email:</strong> {customer.email}</p>
                  <p><strong>Phone:</strong> {customer.phone}</p>
                  <p><strong>Last Booking:</strong> {customer.lastBooking ? new Date(customer.lastBooking).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-customers">
              {searchTerm ? 'No customers found matching your search.' : 'No customers registered yet.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;