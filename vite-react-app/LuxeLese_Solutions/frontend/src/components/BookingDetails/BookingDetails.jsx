import React from 'react';
import './BookingDetails.css';
import GradientButton from '../GradientButton/GradientButton';

const BookingDetails = ({ selectedDates, formData, onChange, onSubmit, className }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = () => {
    if (selectedDates.length >= 2) {
      const sorted = [...selectedDates].sort((a, b) => new Date(a) - new Date(b));
      const start = new Date(sorted[0]);
      const end = new Date(sorted[sorted.length - 1]);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return days;
    }
    return selectedDates.length;
  };

  return (
    <div className={`booking-details-container ${className}`}>
      <h2 className="booking-title">Enter Your Information</h2>

      {/* Selected Dates Display */}
      {selectedDates.length > 0 && (
        <div className="selected-dates-section">
          <h3>Confirm Your Dates</h3>
          <div className="dates-display">
            {selectedDates.length === 1 ? (
              <p className="single-date">{formatDate(selectedDates[0])}</p>
            ) : (
              <>
                <p className="date-range">
                  <span className="date-label">From:</span> {formatDate(selectedDates[0])}
                </p>
                <p className="date-range">
                  <span className="date-label">To:</span> {formatDate(selectedDates[selectedDates.length - 1])}
                </p>
                <p className="duration">
                  <span className="duration-badge">{calculateDuration()} Days</span>
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
          <div className="summary-row">
            <span>Rental Duration:</span>
            <span className="summary-value">{calculateDuration()} Day(s)</span>
          </div>
          <div className="summary-row">
            <span>Selected Dates:</span>
            <span className="summary-value">{selectedDates.length} Date(s)</span>
          </div>
        </div>

        <GradientButton type="submit">
          Confirm & Proceed to Payment
        </GradientButton>
      </form>
    </div>
  );
};

export default BookingDetails;
