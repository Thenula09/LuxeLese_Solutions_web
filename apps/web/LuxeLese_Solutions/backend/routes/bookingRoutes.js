import express from 'express';
import { createBooking, getBookedDates } from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings - Create a new booking (allows guest bookings)
router.post('/', createBooking);

// GET /api/bookings/booked-dates/:carId - Get booked dates for a specific car
router.get('/booked-dates/:carId', getBookedDates);

export default router;
