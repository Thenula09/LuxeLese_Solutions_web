import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Use the same beautiful CSS as Register
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackArrowIcon from '../../components/BackArrowIcon';
import { } from 'react-icons/fa';
import loginImage from '../../assets/81fb9550abc9c1128c999670af31f609.jpg';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      setMessage(response.data.message);
      localStorage.setItem('resetEmail', email); // Store email for reset page
      setTimeout(() => {
        navigate('/otp-verification');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-content-box">
        {/* වම් පැත්තේ Image කොටස */}
        <div className="login-image-section register">
          <img src={loginImage} alt="Luxury Car" className="side-image register" />
          <div className="image-overlay register">
            <div className="animate-fade-in">
              <h1 className="overlay-title">Forgot Password?</h1>
              <p className="overlay-text">
                No worries! Enter your email and we'll send you a reset code to get back into your account.
              </p>
            </div>
          </div>
        </div>

        {/* දකුණු පැත්තේ Form කොටස */}
        <div className="login-form-container register">
          <div className="login-form-card register">
            <h2 className="login-title register">Forgot Password</h2>

            <button type="button" className="back-button" onClick={() => navigate(-1)}>
              <BackArrowIcon size={18} color="#666" />
              <span>Back</span>
            </button>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label-text">Email Address</label>
                <div className="input-with-icon">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}
              {message && <p className="auth-success">{message}</p>}

              <div className="form-actions">
                <GradientButton
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </GradientButton>
              </div>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
                <p className="form-footer-text">
                  Remember your password? <Link to="/signin" style={{ color: '#FF8C00', fontWeight: 'bold' }}>Sign In</Link>
                </p>
                <p className="form-footer-text">
                  Don't have an account? <Link to="/register" style={{ color: '#FF8C00', fontWeight: 'bold' }}>Create one</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
