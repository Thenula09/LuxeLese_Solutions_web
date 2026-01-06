import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Assuming you have some shared auth styles
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we will send you a code to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Send Reset Code</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="auth-footer">
          <p>Remember your password? <Link to="/login">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
