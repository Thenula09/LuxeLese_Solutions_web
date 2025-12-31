import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/footer';
import Calendar from '../components/Calendar/Calendar';
import BookingDetails from '../components/BookingDetails/BookingDetails';
import './placeoder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Vehicle details (you can get this from props or route state)
  const vehicleDetails = {
    name: 'Luxury Sedan',
    model: '2024 Mercedes S-Class',
    image: '/assets/car-placeholder.jpg',
    pricePerDay: 150,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth']
  };

  const handleDateSelect = (date) => {
    const dateString = date.toISOString();
    
    setSelectedDates(prev => {
      const exists = prev.some(d => new Date(d).toDateString() === date.toDateString());
      
      if (exists) {
        return prev.filter(d => new Date(d).toDateString() !== date.toDateString());
      } else {
        return [...prev, dateString].sort((a, b) => new Date(a) - new Date(b));
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedDates.length === 0) {
      alert('Please select at least one date for your booking.');
      return;
    }

    const bookingData = {
      ...formData,
      dates: selectedDates,
      vehicle: vehicleDetails,
      totalAmount: calculateTotal()
    };

    console.log('Booking Data:', bookingData);
    navigate('/payment', { state: bookingData });
  };

  const calculateTotal = () => {
    const days = selectedDates.length >= 2 
      ? Math.ceil((new Date(selectedDates[selectedDates.length - 1]) - new Date(selectedDates[0])) / (1000 * 60 * 60 * 24)) + 1
      : selectedDates.length;
    return days * vehicleDetails.pricePerDay;
  };

  return (
    <div className="place-order-page">
      <Navbar />
      
      <div className="place-order-container">
        <h1 className="page-title">Secure Your Ride: Complete Your Booking</h1>
        
        <div className="booking-layout">
          <div className="left-section">
            <div className="vehicle-section">
              <div className="vehicle-card">
                <div className="vehicle-image">
                  <img 
                    src={vehicleDetails.image} 
                    alt={vehicleDetails.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=Luxury+Vehicle';
                    }}
                  />
                  <div className="vehicle-badge">Premium</div>
                </div>
                
                <div className="vehicle-info">
                  <h2>Vehicle Summary</h2>
                  <p className="vehicle-model">{vehicleDetails.name} - {vehicleDetails.model}</p>
                  
                  <div className="vehicle-price">
                    <span className="price-label">Base Rate:</span>
                    <span className="price-amount">${vehicleDetails.pricePerDay}/day</span>
                  </div>
                  
                  <div className="vehicle-features">
                    <h3>Key Features</h3>
                    <ul>
                      {vehicleDetails.features.map((feature, index) => (
                        <li key={index}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedDates.length > 0 && (
                    <div className="total-section">
                      <div className="total-row">
                        <span>Estimated Total:</span>
                        <span className="total-amount">${calculateTotal()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          <div className="booking-section">
            <div className="calendar-wrapper">
              <h2 className="section-title">Choose Your Dates</h2>
              <Calendar
                className="calender"
                onDateSelect={handleDateSelect}
                selectedDates={selectedDates}
              />
            </div>
            <BookingDetails
              selectedDates={selectedDates}
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PlaceOrder;
