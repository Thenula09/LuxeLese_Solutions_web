import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import { API_ENDPOINTS } from '../../config/api';
import { setAuthData } from '../../utils/auth';


const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD, { otp });
      setMessage(response.data.message);
      // Store token and user data
      setAuthData(response.data.data.token, response.data.data.user);
      localStorage.removeItem('resetEmail'); // Clean up
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <p>We sent a 6-digit OTP to <strong>{email}</strong></p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="otp">Enter OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength="6"
            />
          </div>
          <button type="submit" className="auth-button">Verify OTP & Login</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
