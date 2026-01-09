import React, { useState } from 'react';
import DotGridBackground from './Auth/DotGridBackground';
import BackArrowIcon from '../components/BackArrowIcon';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token and user data to localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        // Navigate to booking page
        navigate('/booking');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotGridBackground>
      <div className="contactus-section signin-form">
        <h2 className="contactus-title">Sign In</h2>
        <form className="contactus-form" onSubmit={handleSubmit}>
          <input
            className="contactus-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="contactus-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}
          <button className="contactus-btn" type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <button
            type="button"
            className="contactus-btn"
            style={{background: '#444', marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}
            onClick={() => navigate(-1)}
          >
            <BackArrowIcon size={20} color="#fff" />
            Back
          </button>
        </form>
        <div className="contactus-info">
          Don't have an account?{' '}
          <span style={{color: '#FF8C00', cursor: 'pointer'}} onClick={() => navigate('/register')}>Register</span>
        </div>
      </div>
    </DotGridBackground>
  );
};

export default SignIn;
