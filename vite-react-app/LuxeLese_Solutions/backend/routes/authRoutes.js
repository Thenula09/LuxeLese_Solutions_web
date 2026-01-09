import express from 'express';
import { register, login, forgotPassword, resetPassword, resetPasswordWithToken } from '../controllers/authController.js';

const router = express.Router();

// Public routes - Token නැතිව වැඩ කරයි
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', resetPasswordWithToken);


export default router;