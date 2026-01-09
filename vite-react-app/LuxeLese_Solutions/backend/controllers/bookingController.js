import Booking from '../models/Booking.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import process from 'process';

// JWT Token generate කරනවා
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    let {
      fullName,
      email,
      phoneNumber,
      whatsappNumber,
      address,
      additionalNote,
      selectedDates,
      carId,
      carName,
      userId
    } = req.body;

    // If user is logged in, get userId and name from req.user
    if (req.user) {
      userId = req.user._id;
      fullName = req.user.name;
      email = req.user.email;
    } else {
      // Create a temporary user for guest booking
      const tempPassword = Math.random().toString(36).slice(-12); // Generate random password
      
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          name: fullName,
          email,
          password: tempPassword
        });
      }
      userId = user._id;
      
      // Generate token for auto-login
      const token = generateToken(user._id);
      
      // Include token in response for auto-login
      res.locals.token = token;
    }

    if (!fullName || !email || !phoneNumber || !address || !selectedDates || !Array.isArray(selectedDates) || selectedDates.length === 0 || !carId || !carName) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Calculate start date, end date, and number of days based on selected dates count
    const parsedDates = selectedDates.map(d => new Date(d)).sort((a, b) => a - b);
    const startDate = parsedDates[0];
    const endDate = parsedDates[parsedDates.length - 1];
    const numberOfDays = parsedDates.length;  // Count of selected dates only

    const booking = new Booking({
      fullName,
      email,
      phoneNumber,
      whatsappNumber,
      address,
      additionalNote,
      selectedDates: parsedDates,
      startDate,
      endDate,
      numberOfDays,
      carId,
      carName,
      userId
    });
    await booking.save();
    
    const response = { success: true, data: booking };
    if (res.locals.token) {
      response.token = res.locals.token;
      response.message = 'Booking created successfully. You are now logged in.';
    }
    
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get booked dates for a specific car
export const getBookedDates = async (req, res) => {
  try {
    const { carId } = req.params;
    
    if (!carId) {
      return res.status(400).json({ success: false, message: 'Car ID is required' });
    }

    // Find all bookings for this car
    const bookings = await Booking.find({ carId });
    
    // Collect all selected dates from all bookings
    const bookedDates = [];
    bookings.forEach(booking => {
      booking.selectedDates.forEach(date => {
        bookedDates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
      });
    });
    
    // Remove duplicates
    const uniqueBookedDates = [...new Set(bookedDates)];
    
    res.status(200).json({ success: true, bookedDates: uniqueBookedDates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
