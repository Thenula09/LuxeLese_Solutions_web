import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import { API_ENDPOINTS } from '../../config/api';
import { setAuthData } from '../../utils/auth';

const ResetPasswordToken = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isValidToken, setIsValidToken] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    // Validate token on component mount
    const validateToken = async () => {
      try {
        // We can add a token validation endpoint, but for now assume it's valid
        setIsValidToken(true);
      } catch (err) {
        setIsValidToken(false);
        setError('Invalid or expired reset link');
      }
    };

    if (token) {
      validateToken();
    } else {
      setError('No reset token provided');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD_TOKEN(token), { password });
      setMessage(response.data.message);
      // Store token and user data
      setAuthData(response.data.data.token, response.data.data.user);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  if (isValidToken === false) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h2>Invalid Reset Link</h2>
          <p>The password reset link is invalid or has expired.</p>
          <button onClick={() => navigate('/forgot-password')} className="auth-button">
            Request New Reset Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Your Password</h2>
        <p>Enter your new password below.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="auth-button">Reset Password</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordToken;