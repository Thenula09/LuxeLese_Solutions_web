import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/footer';
import './Payment.css';

const stripePromise = loadStripe('pk_test_...'); // Replace with your publishable key

const CheckoutForm = ({ navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  
  const bookingData = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        
        if (!bookingData.totalAmount || !bookingData.bookingId) {
          setError('Booking data is missing. Please go back and create a booking.');
          setIsLoading(false);
          return;
        }

        const res = await fetch('/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            amount: bookingData.totalAmount,
            bookingId: bookingData.bookingId
          })
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.success && data.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentIntentId(data.paymentIntentId);
          setDemoMode(data.demoMode || false);
          setError(null);
        } else {
          setError('Failed to create payment intent: ' + (data.message || 'Unknown error'));
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Error loading payment: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [bookingData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!clientSecret) {
      setError('Payment information not loaded. Please wait or refresh the page.');
      return;
    }

    // Validate demo mode inputs
    if (demoMode) {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return;
      }
      if (!expiry || expiry.length !== 5) {
        setError('Please enter a valid expiry date (MM/YY)');
        return;
      }
      if (!cvc || cvc.length !== 3) {
        setError('Please enter a valid 3-digit CVC');
        return;
      }
    }

    setIsProcessing(true);
    setError(null);

    try {
      let paymentIntentVerified = paymentIntentId;

      // If not in demo mode and Stripe is available, process with Stripe
      if (!demoMode && stripe && elements) {
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        });

        if (stripeError) {
          console.error('[payment error]', stripeError);
          setError('Payment failed: ' + stripeError.message);
          setIsProcessing(false);
          return;
        }

        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
          setError('Payment was not successful');
          setIsProcessing(false);
          return;
        }

        paymentIntentVerified = paymentIntent.id;
      } else if (demoMode) {
        // In demo mode, simulate processing
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Confirm payment on backend
      const token = localStorage.getItem('token');
      const confirmRes = await fetch('/api/payments/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentVerified,
          bookingId: bookingData.bookingId
        })
      });

      const confirmData = await confirmRes.json();
      
      if (confirmData.success) {
        setIsProcessing(false);
        // Show success and navigate
        navigate('/payment', { state: { ...bookingData, success: true } });
      } else {
        setIsProcessing(false);
        setError('Payment confirmation failed: ' + confirmData.message);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment error: ' + err.message);
      setIsProcessing(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <div className="payment-page">
      <Navbar />
      <div className="payment-container">
        <h1 className="page-title">Complete Your Payment</h1>
        
        <div className="payment-content">
          {/* Order Summary Box */}
          <div className="order-summary">
            <h3>📦 Order Summary</h3>
            <div className="summary-row">
              <span><span className="icon">🚗</span> Vehicle:</span>
              <span className="vehicle-name">{bookingData.vehicle?.name || 'Selected Vehicle'}</span>
            </div>
            {bookingData.dates && bookingData.dates.length > 0 && (
              <>
                <div className="summary-row">
                  <span><span className="icon">📅</span> Check-in:</span>
                  <span>{new Date(bookingData.dates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="summary-row">
                  <span><span className="icon">🚪</span> Check-out:</span>
                  <span>{new Date(bookingData.dates[bookingData.dates.length - 1]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="summary-row">
                  <span><span className="icon">📆</span> Total Days:</span>
                  <span><strong>{bookingData.dates.length} day(s)</strong></span>
                </div>
              </>
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

          {/* Loading State */}
          {isLoading && (
            <div className="payment-form">
              <h3>Loading Payment...</h3>
              <div className="loader">Processing your booking details...</div>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="error-message" style={{ 
              padding: '15px', 
              backgroundColor: '#fee', 
              color: '#c00', 
              borderRadius: '5px',
              marginBottom: '20px'
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Payment Form */}
          {!isLoading && (
            <form className="payment-form" onSubmit={handleSubmit}>
              <h3>Secure Payment Details</h3>

              {demoMode && (
                <div style={{
                  padding: '10px',
                  backgroundColor: '#e8f5e9',
                  color: '#2e7d32',
                  borderRadius: '5px',
                  marginBottom: '15px',
                  fontSize: '14px'
                }}>
                  ✓ Demo Mode - Enter any card details to test
                </div>
              )}

              <div className="form-group">
                <label><span className="icon">💳</span> Card Details</label>
                {demoMode ? (
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#666' }}>Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          if (value.length <= 19) {
                            setCardNumber(value);
                          }
                        }}
                        maxLength="19"
                        style={{ 
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '16px',
                          fontFamily: 'monospace',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#666' }}>Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/25"
                          value={expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            if (value.length <= 5) {
                              setExpiry(value);
                            }
                          }}
                          maxLength="5"
                          style={{ 
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#666' }}>CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              setCvc(value);
                            }
                          }}
                          maxLength="3"
                          style={{ 
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <CardElement options={cardStyle} />
                )}
              </div>

              <div className="security-notice">
                <span className="icon">🔐</span>
                <small>Your payment information is secured with 256-bit SSL encryption</small>
              </div>

              <button type="submit" className="pay-btn" disabled={isProcessing || !clientSecret}>
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Processing Payment...
                  </>
                ) : !clientSecret ? (
                  'Loading...'
                ) : (
                  `Pay Now - $${bookingData.totalAmount || 0}`
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};

  // Payment successful message
  if (bookingData.success) {
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

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm navigate={navigate} />
    </Elements>
  );
};

export default Payment;