import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/footer';
import './Payment.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // PlaceOrder පිටුවෙන් එවපු data ටික මෙතනින් ගන්නවා
  const bookingData = location.state || {}; 
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000); // 2 second delay to simulate processing
  };

  // Payment එක සාර්ථක වුනාම පෙන්වන කොටස
  if (isSuccess) {
    return (
      <div className="payment-page">
        <Navbar />
        <div className="payment-container success-container">
          <div className="success-card">
            <div className="success-icon">✅</div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your booking{bookingData.name ? `, ${bookingData.name}` : ''}.</p>
            <p>Your ride has been secured successfully.</p>
            <button className="home-btn" onClick={() => navigate('/')}>
              Go to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Payment Form එක පෙන්වන කොටස
  return (
    <div className="payment-page">
      <Navbar />
      <div className="payment-container">
        <h1 className="page-title">Complete Your Payment</h1>
        
        <div className="payment-content">
          {/* Order Summary Box */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span><span className="icon">🚗</span> Vehicle:</span>
              <span className="vehicle-name">{bookingData.vehicle?.name || 'Selected Vehicle'}</span>
            </div>
            {bookingData.dates && bookingData.dates.length > 0 && (
              <div className="summary-row">
                <span><span className="icon">📅</span> Rental Days:</span>
                <span>{bookingData.dates.length} day(s)</span>
              </div>
            )}
            <div className="summary-row">
              <span><span className="icon">💰</span> Daily Rate:</span>
              <span>${bookingData.vehicle?.pricePerDay || 150}/day</span>
            </div>
            <div className="summary-row total">
              <span><span className="icon">💳</span> Total Amount:</span>
              <span className="amount">${bookingData.totalAmount || 0}</span>
            </div>
          </div>

          {/* Payment Form */}
          <form className="payment-form" onSubmit={handlePayment}>
            <h3>Secure Payment Details</h3>

            <div className="form-group">
              <label><span className="icon">💳</span> Card Number</label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                onChange={(e) => {
                  // Format card number with spaces
                  const value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  e.target.value = value;
                }}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><span className="icon">📅</span> Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  onChange={(e) => {
                    // Format expiry date
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                      e.target.value = value.slice(0, 2) + '/' + value.slice(2, 4);
                    } else {
                      e.target.value = value;
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label><span className="icon">🔒</span> CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  maxLength="3"
                  onChange={(e) => {
                    // Only allow numbers
                    e.target.value = e.target.value.replace(/\D/g, '');
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label><span className="icon">👤</span> Cardholder Name</label>
              <input
                type="text"
                placeholder="Name on Card"
                onChange={(e) => {
                  // Capitalize first letter of each word
                  e.target.value = e.target.value.replace(/\b\w/g, l => l.toUpperCase());
                }}
              />
            </div>

            <div className="security-notice">
              <span className="icon">🔐</span>
              <small>Your payment information is secured with 256-bit SSL encryption</small>
            </div>

            <button type="submit" className="pay-btn" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing Payment...
                </>
              ) : (
                `Pay Now - $${bookingData.totalAmount || 0}`
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;