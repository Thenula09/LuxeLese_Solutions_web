import React, { useState, useEffect } from 'react';
import './footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { getCurrentUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/ChatGPT Image Jan 14, 2026, 06_52_05 PM.png';

const Footer = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    // Listen for auth state changes (custom event)
    const updateUser = () => setUser(getCurrentUser());
    window.addEventListener('authStateChanged', updateUser);
    window.addEventListener('storage', updateUser);
    return () => {
      window.removeEventListener('authStateChanged', updateUser);
      window.removeEventListener('storage', updateUser);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-cta">
          {user ? (
            <>
              <h4>Welcome, {user.name}! 👋</h4>
              <p>Logged in as: <strong>{user.email}</strong></p>
              <div className="user-info-display" style={{
                marginTop: '15px',
                padding: '15px',
                background: 'rgba(255, 140, 0, 0.1)',
                border: '1px solid rgba(255, 140, 0, 0.3)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, color: '#FF8C00', fontWeight: 'bold', fontSize: '16px' }}>
                  {user.name}
                </p>
              </div>
            </>
          ) : (
            <>
              <h4>Join LuxeLese Solutions <img src={logoImage} alt="LuxeLese Solutions" className="footer-logo" /></h4>
              <p>Register to get updates, promotions, and more.</p>
              <div className="email-signup">
                <input type="email" placeholder="Your email address" />
                <button type="submit" onClick={() => navigate('/signin')}>Sign In</button>
              </div>
            </>
          )}
        </div>

        <div className="footer-sections-container">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Get in Touch</a></li>
              <li><a href="#">Reviews</a></li>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">New Arrivals</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Our Brands</h4>
            <ul>
              <li><a href="#">Porsche</a></li>
              <li><a href="#">Audi</a></li>
              <li><a href="#">BMW</a></li>
              <li><a href="#">Ford</a></li>
              <li><a href="#">Nissan</a></li>
              <li><a href="#">Peugeot</a></li>
              <li><a href="#">Volkswagen</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Vehicle Types</h4>
            <ul>
              <li><a href="#">Sedan</a></li>
              <li><a href="#">Hatchback</a></li>
              <li><a href="#">SUV</a></li>
              <li><a href="#">Hybrid</a></li>
              <li><a href="#">Electric</a></li>
              <li><a href="#">Coupe</a></li>
              <li><a href="#">Truck</a></li>
              <li><a href="#">Convertible</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Our Mobile App</h4>
            <div className="app-store-links">
              <a href="#"><FaApple /> Apple Store</a>
              <a href="#"><FaGooglePlay /> Google Play</a>
            </div>
            <h4 className="connect-heading">Connect With Us</h4>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 LuxeLese Solutions. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Notice</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;