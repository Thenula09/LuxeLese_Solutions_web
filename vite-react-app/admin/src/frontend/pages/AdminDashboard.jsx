import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>LuxeLese Admin Dashboard</h1>
        <div className="admin-user">
          <span>Admin</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><Link to="/admin">Dashboard</Link></li>
              <li><Link to="/admin/cars">Manage Cars</Link></li>
              <li><Link to="/admin/bookings">Bookings</Link></li>
              <li><Link to="/admin/users">Users</Link></li>
              <li><Link to="/admin/reports">Reports</Link></li>
              <li><Link to="/admin/settings">Settings</Link></li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Cars</h3>
              <p className="stat-number">45</p>
              <span className="stat-label">Available vehicles</span>
            </div>
            <div className="stat-card">
              <h3>Active Bookings</h3>
              <p className="stat-number">23</p>
              <span className="stat-label">Currently rented</span>
            </div>
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">350</p>
              <span className="stat-label">Registered customers</span>
            </div>
            <div className="stat-card">
              <h3>Revenue</h3>
              <p className="stat-number">$45,230</p>
              <span className="stat-label">This month</span>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Bookings</h2>
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#001</td>
                  <td>John Doe</td>
                  <td>Mercedes S-Class</td>
                  <td>2024-12-15</td>
                  <td><span className="status active">Active</span></td>
                  <td><button className="btn-view">View</button></td>
                </tr>
                <tr>
                  <td>#002</td>
                  <td>Jane Smith</td>
                  <td>BMW 7 Series</td>
                  <td>2024-12-14</td>
                  <td><span className="status completed">Completed</span></td>
                  <td><button className="btn-view">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
