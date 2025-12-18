import express from 'express';
import { getAdminStats, getAllBookings, updateBookingStatus } from '../controllers/adminController.js';

const router = express.Router();

// Admin routes
router.get('/stats', getAdminStats);
router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);

export default router;
