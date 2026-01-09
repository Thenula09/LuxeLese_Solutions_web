import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackArrowIcon from '../../components/BackArrowIcon';
import DotGridBackground from './DotGridBackground';
import { setAuthData } from '../../utils/auth';

import loginImage from '../../assets/81fb9550abc9c1128c999670af31f609.jpg';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        // Store token and user data using setAuthData (broadcasts to all components)
        setAuthData(data.data.token, data.data.user);
        
        setSuccess('Login successful! Redirecting...');
        
        // Show loading screen for 2 seconds then redirect
        setTimeout(() => {
          // Check user role from response for admin redirect
          if (data.data.user.role === 'admin') {
            navigate('/loading', { state: { redirectTo: '/admindashboard', delay: 2000 } });
          } else {
            navigate('/loading', { state: { redirectTo: '/', delay: 2000 } });
          }
        }, 500);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error. Please check your connection.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-image-section">
        <img src={loginImage} alt="Decorative background" className="side-image" />
        <div className="image-overlay">
          <div className="overlay-content">
            <h2>Hello!</h2>
            <p>Have a GOOD DAY</p>
          </div>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form-card">
          <h2 className="login-title">Login</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <GradientButton type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Login'}
            </GradientButton>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;