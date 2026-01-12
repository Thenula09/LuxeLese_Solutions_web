import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';
import GradientButton from '../../components/GradientButton/GradientButton';
import BackArrowIcon from '../../components/BackArrowIcon';
import { FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';
import loginImage from '../../assets/81fb9550abc9c1128c999670af31f609.jpg';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const email = localStorage.getItem('resetEmail') || '';

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
      return;
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Password reset successful! Redirecting to login...');
        localStorage.removeItem('resetEmail');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        setError(data.message || 'OTP verification failed.');
      }
    } catch (err) {
      setError('Connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('OTP sent successfully!');
        setCountdown(60);
        setCanResend(false);
      } else {
        setError(data.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      setError('Connection error.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="signin-page-wrapper">
      <div className="signin-content-box">
        {/* Left Image Section */}
        <div className="login-image-section signin">
          <img src={loginImage} alt="background" className="side-image signin" />
          <div className="image-overlay signin">
            <h2 className="overlay-title animate-fade-in">Verify OTP</h2>
            <p className="overlay-text animate-slide-up">Enter the code sent to your email</p>
          </div>
        </div>

        {/* Right White Form Section */}
        <div className="login-form-container signin">
          <div className="login-form-card signin">
            <h2 className="login-title signin">OTP Verification</h2>

            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#666' }}>
              <p>We sent a 6-digit OTP to</p>
              <p style={{ fontWeight: 'bold', color: '#FF8C00' }}>{email}</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label-text">Enter OTP</label>
                <div className="input-with-icon">
                  <span className="input-icon"><FaKey /></span>
                  <input
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength="6"
                    style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', letterSpacing: '4px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-text">New Password</label>
                <div className="input-with-icon">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label-text">Confirm New Password</label>
                <div className="input-with-icon">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="input-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle confirm password visibility">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="auth-error">{error}</p>}
              {success && <p className="auth-success">{success}</p>}

              <GradientButton type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Reset Password'}
              </GradientButton>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendLoading}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#FF8C00',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                >
                  {resendLoading ? 'Sending...' : 'Resend OTP'}
                </button>
              ) : (
                <p style={{ fontSize: '14px', color: '#666' }}>
                  Resend OTP in {countdown} seconds
                </p>
              )}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px' }}>
              <span className="form-footer-text">
                Remember your password?{' '}
              </span>
              <Link to="/signin" style={{ color: '#FF8C00', fontWeight: 'bold' }}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;