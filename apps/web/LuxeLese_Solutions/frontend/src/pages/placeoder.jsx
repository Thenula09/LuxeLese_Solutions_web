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
    whatsappNumber: '',
    address: '',
    notes: ''
  });

  // Get vehicle details from route state
  const vehicleDetails = location.state?.vehicle || null;

  const handleDateSelect = (date) => {
    // Convert date to start of day in local timezone
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dateString = localDate.toISOString();

    setSelectedDates(prev => {
      const exists = prev.some(d => {
        const existingDate = new Date(d);
        return existingDate.getFullYear() === localDate.getFullYear() &&
               existingDate.getMonth() === localDate.getMonth() &&
               existingDate.getDate() === localDate.getDate();
      });

      if (exists) {
        return prev.filter(d => {
          const existingDate = new Date(d);
          return !(existingDate.getFullYear() === localDate.getFullYear() &&
                   existingDate.getMonth() === localDate.getMonth() &&
                   existingDate.getDate() === localDate.getDate());
        });
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

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address || selectedDates.length === 0) {
      alert('Please fill all required fields and select at least one date.');
      return;
    }

    // Format WhatsApp number to international format if provided
    let formattedWhatsappNumber = formData.whatsappNumber;
    if (formattedWhatsappNumber && !formattedWhatsappNumber.startsWith('+')) {
      // Assume Sri Lankan number if it starts with 0
      if (formattedWhatsappNumber.startsWith('0')) {
        formattedWhatsappNumber = '+94' + formattedWhatsappNumber.substring(1);
      } else {
        formattedWhatsappNumber = '+' + formattedWhatsappNumber;
      }
    }

    // Get userId from localStorage if available
    let userId = null;
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user._id) userId = user._id;
    } catch {}

    // Prepare booking data for backend
    const bookingPayload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      whatsappNumber: formattedWhatsappNumber,
      address: formData.address,
      additionalNote: formData.notes,
      selectedDates,
      carId: vehicleDetails?._id,
      carName: vehicleDetails?.name,
      userId
    };
    if (!bookingPayload.carId) {
      alert('Booking failed: Car ID missing. Please select a valid car.');
      return;
    }

    // Get JWT token
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(bookingPayload)
      });
      const data = await res.json();
      if (data.success) {
        // Pass booking data to payment page
        navigate('/payment', { state: {
          ...bookingPayload,
          totalAmount: calculateTotal(),
          vehicle: vehicleDetails,
          dates: selectedDates,
          bookingId: data.data._id
        }});
      } else {
        alert('Booking failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  const calculateTotal = () => {
    // Calculate based on number of selected dates only
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
          vehicle={vehicleDetails}
        />
        
        <Calendar
          className="calendar-section"
          selectedDates={selectedDates}
          onDateSelect={handleDateSelect}
          carId={vehicleDetails?._id || vehicleDetails?.id} />
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
