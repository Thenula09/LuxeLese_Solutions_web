import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackArrowIcon from '../../components/BackArrowIcon';
import DotGridBackground from './DotGridBackground';

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
        // Store token and user data
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
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
    <DotGridBackground>
      {/* Transparent background image above DotGrid */}
      <img 
        src="/background-image.png" 
        alt="background" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.25,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      <div className="auth-container">
        <div className="auth-card">
          <button
            type="button"
            aria-label="Go home"
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'absolute',
              top: 24,
              left: 8,
              padding: 0,
              zIndex: 2
            }}
          >
            <BackArrowIcon size={28} color="#FF8C00" />
          </button>
          <h2 style={{marginTop: 0}}>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to continue to LuxeLese</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ textAlign: 'center' }}
                  className="input-move-placeholder"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ textAlign: 'center' }}
                  className="input-move-placeholder"
                />
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}
            {success && <p className="auth-success">{success}</p>}

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <GradientButton type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </GradientButton>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </DotGridBackground>
  );
};

export default SignIn;