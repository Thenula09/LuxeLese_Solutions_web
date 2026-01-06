import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();

// POST /api/bookings - Create a new booking (allows guest bookings)
router.post('/', createBooking);

export default router;
