import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    onClose();
  };

  const closeSidebar = () => {
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <h3>LuxeLese_Solutions.</h3>
      </div>
      <ul className="nav-main">
        <li><Link to="/home" onClick={closeSidebar}><span className="nav-icon">🏠</span> Dashboard</Link></li>
        <li><Link to="/home/bookings" onClick={closeSidebar}><span className="nav-icon">📋</span> Bookings</Link></li>
        <li><Link to="/home/vehicles" onClick={closeSidebar}><span className="nav-icon">🚗</span> Vehicles</Link></li>
        <li><Link to="/home/income-analysis" onClick={closeSidebar}><span className="nav-icon">📊</span> Analytics</Link></li>
        <li><Link to="/home/users" onClick={closeSidebar}><span className="nav-icon">👥</span> Users</Link></li>
      </ul>
      <ul className="nav-bottom">
        <li><Link to="/home" onClick={closeSidebar}><span className="nav-icon">⚙️</span> Settings</Link></li>
        <li><Link to="/home" onClick={closeSidebar}><span className="nav-icon">❓</span> Help Center</Link></li>
        <li onClick={handleLogout} className="logout-link"><span className="nav-icon">🚪</span> Log out</li>
      </ul>
    </div>
  );
};

export default Sidebar;