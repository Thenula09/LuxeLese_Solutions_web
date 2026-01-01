import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/footer';
import VehicleDetails from '../components/VehicleDetails/VehicleDetails';
import BookingDetails from '../components/BookingDetails/BookingDetails';
import Calendar from '../components/Calendar/Calendar';
import './placeoder.css';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDates, setSelectedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Get vehicle details from route state
  const vehicleDetails = location.state?.vehicle || null;

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
    // Prevent default only if event exists (for form submission)
    if (e && e.preventDefault) {
      e.preventDefault();
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
    return selectedDates.length * (vehicleDetails?.pricePerDay || 150);
  };

  return (
    <div className="place-order-page">
      <Navbar />
      <div className="place-order-container">
        <h1 className="page-title">Secure Your Ride: Complete Your Booking</h1>

        <VehicleDetails vehicle={vehicleDetails} className="vehicle-details-section" />
        
        <BookingDetails
          className="booking-details-section"
          selectedDates={selectedDates}
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        
        <Calendar
          className="calendar-section"
          selectedDates={selectedDates}
          onDateSelect={handleDateSelect} />
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
