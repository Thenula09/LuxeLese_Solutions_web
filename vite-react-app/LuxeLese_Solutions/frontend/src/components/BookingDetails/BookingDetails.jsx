import React from 'react';
import './BookingDetails.css';
import GradientButton from '../GradientButton/GradientButton';

const BookingDetails = ({ selectedDates, formData, onChange, onSubmit, className, vehicle }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = () => {
    // Duration based on number of selected dates only
    return selectedDates.length;
  };

  const calculateTotalAmount = () => {
    const pricePerDay = vehicle?.pricePerDay || 150;
    return selectedDates.length * pricePerDay;
  };

  const getDateRangeString = () => {
    if (selectedDates.length === 0) return '';
    if (selectedDates.length === 1) {
      return formatDate(selectedDates[0]);
    }
    const sorted = [...selectedDates].sort((a, b) => new Date(a) - new Date(b));
    return `${formatDate(sorted[0])} to ${formatDate(sorted[sorted.length - 1])}`;
  };

  return (
    <div className={`booking-details-container ${className}`}>
      <h2 className="booking-title">Enter Your Information</h2>

      {/* Selected Dates Display */}
      {selectedDates.length > 0 && (
        <div className="selected-dates-section">
          <h3>📅 Confirm Your Dates</h3>
          <div className="dates-display">
            {selectedDates.length === 1 ? (
              <p className="single-date">
                <strong>Date:</strong> {formatDate(selectedDates[0])} (1 Day)
              </p>
            ) : (
              <>
                <p className="date-range">
                  <strong>Check-in:</strong> {formatDate(selectedDates[0])}
                </p>
                <p className="date-range">
                  <strong>Check-out:</strong> {formatDate(selectedDates[selectedDates.length - 1])}
                </p>
                <p className="duration">
                  <span className="duration-badge">📆 {calculateDuration()} Days</span>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Booking Form */}
      <form onSubmit={onSubmit} className="booking-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="form-group">
          <label htmlFor="whatsappNumber">WhatsApp Number (for notifications)</label>
          <input
            type="tel"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={onChange}
            placeholder="+1 (555) 123-4567"
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            We'll send booking confirmation to this WhatsApp number
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter your complete address"
            rows="2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={onChange}
            placeholder="Any special requests or requirements"
            rows="2"
          />
        </div>

        <div className="booking-summary">
          <h3>💰 Booking Summary</h3>
          
          {selectedDates.length > 0 ? (
            <>
              <div className="summary-row">
                <span>� Selected Dates:</span>
                <span className="summary-value"><strong>{selectedDates.length} Day(s)</strong></span>
              </div>
              <div className="summary-row">
                <span>💲 Price per Day:</span>
                <span className="summary-value">${vehicle?.pricePerDay || 150}</span>
              </div>
              <div className="summary-row calculation">
                <span style={{ fontSize: '0.85rem', color: '#bbb' }}>Calculation: {selectedDates.length} days × ${vehicle?.pricePerDay || 150}/day</span>
              </div>
              <div className="summary-row total" style={{ borderTop: '2px solid #ff9500', paddingTop: '10px', marginTop: '10px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>💳 Total Amount:</span>
                <span className="summary-value" style={{ fontSize: '20px', color: '#ff9500', fontWeight: 'bold' }}>
                  ${calculateTotalAmount()}
                </span>
              </div>
            </>
          ) : (
            <div style={{ color: '#ff9500', textAlign: 'center', padding: '10px' }}>
              📅 Select dates on the calendar to calculate rental amount
            </div>
          )}
        </div>

        <GradientButton type="submit">
          Confirm & Proceed to Payment
        </GradientButton>
      </form>
    </div>
  );
};

export default BookingDetails;
