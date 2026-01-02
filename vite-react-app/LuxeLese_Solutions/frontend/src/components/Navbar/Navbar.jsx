import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../utils/auth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check for logged in user
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update user when localStorage changes in same tab
  useEffect(() => {
    const interval = setInterval(() => {
      const currentUser = getCurrentUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setShowDropdown(false);
    navigate('/signin');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-profile')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const dropdownButtonStyle = {
    width: '100%',
    padding: '12px 20px',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo">LuxeLese Solutions</span>
      </div>
      <div className="navbar-menu">
        <ul className="navbar-links">
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/about">ℹ️ About</Link></li>
          {user && <li><Link to="/booking">🚗 My Bookings</Link></li>}
          {!user && <li><Link to="/booking">🚗 Booking</Link></li>}
          <li><Link to="/contact">📞 Contact</Link></li>
        </ul>
        {user ? (
          <div 
            className="user-profile" 
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="user-profile-inner" style={{
              background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 165, 0, 0.1))',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 140, 0, 0.3)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span style={{ fontWeight: '600' }}>{user.name}</span>
              <span style={{ fontSize: '12px' }}>▼</span>
            </div>
            {showDropdown && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  background: 'rgba(0, 0, 0, 0.95)',
                  border: '1px solid rgba(255, 140, 0, 0.3)',
                  borderRadius: '12px',
                  minWidth: '220px',
                  zIndex: 1000,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                  overflow: 'hidden'
                }}
              >
                {/* User Info Header */}
                <div style={{
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 165, 0, 0.1))',
                  borderBottom: '1px solid rgba(255, 140, 0, 0.2)'
                }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#FF8C00', marginBottom: '4px' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>
                    {user.email}
                  </div>
                </div>

                {/* Menu Items */}
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/about');
                  }}
                  style={dropdownButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 140, 0, 0.2)';
                    e.currentTarget.style.color = '#FF8C00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  <span>ℹ️</span> About
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/booking');
                  }}
                  style={dropdownButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 140, 0, 0.2)';
                    e.currentTarget.style.color = '#FF8C00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  <span>🚗</span> My Bookings
                </button>

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/profile');
                  }}
                  style={dropdownButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 140, 0, 0.2)';
                    e.currentTarget.style.color = '#FF8C00';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  <span>👤</span> Profile
                </button>

                <div style={{
                  height: '1px',
                  background: 'rgba(255, 140, 0, 0.2)',
                  margin: '8px 0'
                }} />

                <button
                  onClick={handleLogout}
                  style={{
                    ...dropdownButtonStyle,
                    color: '#ff4444'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 68, 68, 0.2)';
                    e.currentTarget.style.color = '#ff6666';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ff4444';
                  }}
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="user-profile">
            <div className="user-profile-inner" style={{
              background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 165, 0, 0.1))',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 140, 0, 0.3)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <span>Sign In</span>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
