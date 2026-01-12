import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'; // අලුත් CSS file එක import කරන්න
import GradientButton from '../../components/GradientButton/GradientButton';
import { FaEye, FaEyeSlash, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { setAuthData } from '../../utils/auth';
import loginImage from '../../assets/81fb9550abc9c1128c999670af31f609.jpg';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleGoogleAuth = async () => {
    try {
      window.location.href = '/api/auth/google';
    } catch (err) {
      setError('Google sign-in is currently unavailable. Please use email/password login.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setAuthData(data.data.token, data.data.user);
        setSuccess('Login successful!');
        
        // Navigate to loading page first, then to final destination
        const finalDestination = data.data.user.role === 'admin' ? '/admindashboard' : '/home';
        navigate('/loading', {
          state: {
            redirectTo: finalDestination,
            delay: 2000
          }
        });
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setLoading(false);
      setError('Network error.');
    }
  };

  return (
    <div className="signin-page-wrapper">
      <div className="signin-content-box">
        {/* Left Image Section */}
        <div className="login-image-section signin">
          <img src={loginImage} alt="background" className="side-image signin" />
          <div className="image-overlay signin">
            <h2 className="overlay-title animate-fade-in">Hello!</h2>
            <p className="overlay-text animate-slide-up">Have a GOOD DAY</p>
          </div>
        </div>

        {/* Right White Form Section */}
        <div className="login-form-container signin">
          <div className="login-form-card signin">
            <h2 className="login-title signin">Login</h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label-text">Email Address</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    placeholder="name@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-text">Password</label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}
              {success && <p className="auth-success">{success}</p>}

              <div style={{ textAlign: 'right', marginBottom: '15px' }}>
                <Link to="/forgot-password" className="form-link-text">
                  Forgot Password?
                </Link>
              </div>

              <GradientButton type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Login'}
              </GradientButton>
            </form>

            <div className="social-login-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login-icons">
              <div className="social-icon-button google" onClick={handleGoogleAuth} style={{ cursor: 'pointer' }}>
                <FcGoogle />
              </div>
              <div className="social-icon-button facebook">
                <FaFacebookF />
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
              <p className="form-footer-text">
                Don't have an account? <Link to="/register" style={{ color: '#FF8C00', fontWeight: 'bold' }}>Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;