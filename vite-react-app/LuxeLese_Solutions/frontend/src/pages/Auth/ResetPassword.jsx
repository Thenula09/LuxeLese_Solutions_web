import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';
import { API_ENDPOINTS } from '../../config/api';
import { setAuthData } from '../../utils/auth';


const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD, { code });
      setMessage(response.data.message);
      // Store token and user data
      setAuthData(response.data.data.token, response.data.data.user);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Enter Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="code">Enter the code sent to your email</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
