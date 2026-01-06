import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      address,
      additionalNote,
      selectedDate,
      carId,
      carName,
      userId
    } = req.body;

    if (!fullName || !email || !phoneNumber || !address || !selectedDate || !carId || !carName) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const booking = new Booking({
      fullName,
      email,
      phoneNumber,
      address,
      additionalNote,
      selectedDate,
      carId,
      carName,
      userId
    });
    await booking.save();
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
