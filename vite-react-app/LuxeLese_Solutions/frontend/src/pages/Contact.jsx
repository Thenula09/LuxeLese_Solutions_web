import React from 'react';
import './Contact.css';
import Footer from '../components/Footer/footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <>
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We're here to help and answer any question you might have.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h3>Phone</h3>
                  <p>+94 77 123 4567</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h3>Email</h3>
                  <p>info@luxelese.com</p>
                </div>
              </div>
              
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h3>Location</h3>
                  <p>123 Car Street, Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              
              <div className="form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              
              <div className="form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <div className='footerbara'>
        <Footer />
      </div>
    </>
  );
};

export default Contact;