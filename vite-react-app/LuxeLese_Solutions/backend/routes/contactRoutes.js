import express from 'express';
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', submitContactForm);

// Protected routes (Admin only)
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContactById);
router.put('/:id/status', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

export default router;