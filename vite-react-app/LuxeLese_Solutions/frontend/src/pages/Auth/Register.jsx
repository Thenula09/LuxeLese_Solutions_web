import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackArrowIcon from '../../components/BackArrowIcon';
import { setAuthData } from '../../utils/auth';

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
      const response = await fetch('/api/auth/register', {
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
    <div className="login-page-container">
      <div className="login-image-section">
        <img src="/background-image.png" alt="background" className="side-image" />
        <div className="image-overlay">
          <div className="overlay-content">
            <h2>Join LuxeLese Solutions</h2>
            <p>Create your account to start booking premium vehicles</p>
          </div>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form-card register-form">
          <h2 className="login-title">Register</h2>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}
            {success && <div style={{color: '#4CAF50', textAlign: 'center', marginBottom: '10px'}}>{success}</div>}
            <GradientButton type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </GradientButton>
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
          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/signin" className="auth-link">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
