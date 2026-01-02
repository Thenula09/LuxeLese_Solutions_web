import React, { useState } from 'react';
import DotGridBackground from './Auth/DotGridBackground';
import BackArrowIcon from '../components/BackArrowIcon';
import { useNavigate } from 'react-router-dom';
import './booking.css';

const API_URL = 'http://localhost:5001/api';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registration successful! Redirecting to sign in...');
        // Clear form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirect to sign in page after 2 seconds
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Connection error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DotGridBackground>
      <div className="contactus-section" style={{maxWidth: 400}}>
        <h2 className="contactus-title">Register</h2>
        <form className="contactus-form" onSubmit={handleSubmit}>
          <input
            className="contactus-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
          <input
            className="contactus-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}
          {success && <div style={{color: '#4CAF50', textAlign: 'center', marginBottom: '10px'}}>{success}</div>}
          <button className="contactus-btn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
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
          Already have an account?{' '}
          <span style={{color: '#FF8C00', cursor: 'pointer'}} onClick={() => navigate('/signin')}>Sign In</span>
        </div>
      </div>
    </DotGridBackground>
  );
};

export default Register;
