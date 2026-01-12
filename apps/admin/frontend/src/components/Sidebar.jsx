import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h3>LuxeLese_Solutions.</h3>
      </div>
      <ul className="nav-main">
        <li><Link to="/home"><span className="nav-icon">🏠</span> Dashboard</Link></li>
        <li><Link to="/home/bookings"><span className="nav-icon">📋</span> Bookings</Link></li>
        <li><Link to="/home/vehicles"><span className="nav-icon">🚗</span> Vehicles</Link></li>
        <li><Link to="/home/income-analysis"><span className="nav-icon">📊</span> Analytics</Link></li>
        <li><Link to="/home/users"><span className="nav-icon">👥</span> Users</Link></li>
      </ul>
      <ul className="nav-bottom">
        <li><Link to="/home"><span className="nav-icon">⚙️</span> Settings</Link></li>
        <li><Link to="/home"><span className="nav-icon">❓</span> Help Center</Link></li>
        <li onClick={handleLogout} className="logout-link"><span className="nav-icon">🚪</span> Log out</li>
      </ul>
    </div>
  );
};

export default Sidebar;