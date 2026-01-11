import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackArrowIcon from '../../components/BackArrowIcon';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginImage from '../../assets/81fb9550abc9c1128c999670af31f609.jpg'; // SignIn එකේ image එකම භාවිතා කළ හැක

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-content-box">
        {/* Left Section with Image */}
        <div className="login-image-section register">
          <img src={loginImage} alt="background" className="side-image register" />
          <div className="image-overlay register">
            <h2 className="overlay-title animate-fade-in">Join Us</h2>
            <p className="overlay-text animate-slide-up">Create your account and start your journey with LuxeLese Solutions</p>
          </div>
        </div>

        {/* Right Section with White Form */}
        <div className="login-form-container register">
          <div className="login-form-card register">
            <h2 className="login-title register">Register</h2>

            <button type="button" className="back-button" onClick={() => navigate(-1)}>
              <BackArrowIcon size={18} color="#666" />
              <span>Back</span>
            </button>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label-text">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label-text">Email Address</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-text">Password</label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-text">Confirm Password</label>
                <div className="input-with-icon">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle confirm password visibility">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{error}</p>}
              {success && <p style={{color: 'green', fontSize: '12px', textAlign: 'center'}}>{success}</p>}

              <GradientButton type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </GradientButton>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>
              <span className="form-footer-text">
                Already have an account?{' '}
              </span>
              <Link to="/signin" style={{ color: '#FF8C00', fontWeight: 'bold' }}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
