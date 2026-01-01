import React, { useState } from 'react';
import BackArrowIcon from '../components/BackArrowIcon';
import { useNavigate } from 'react-router-dom';
import './booking.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // TODO: Add real authentication logic
    setError('');
    navigate('/');
  };

  return (
    <div className="contactus-section" style={{maxWidth: 400}}>
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
        <button className="contactus-btn" type="submit">Sign In</button>
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
  );
};

export default SignIn;
