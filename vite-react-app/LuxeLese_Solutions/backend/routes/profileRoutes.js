import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  getUserBookings,
  getUserBookingDetails,
  getUserPayments,
  getUserStats,
  upload
} from '../controllers/profileController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Profile routes
router.get('/', getUserProfile);
router.put('/', updateUserProfile);
router.post('/upload-picture', upload.single('profilePicture'), uploadProfilePicture);

// Booking routes
router.get('/bookings', getUserBookings);
router.get('/bookings/:id', getUserBookingDetails);

// Payment routes
router.get('/payments', getUserPayments);

// Statistics route
router.get('/stats', getUserStats);

export default router;