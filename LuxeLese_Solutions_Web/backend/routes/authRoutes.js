import express from 'express';
import passport from 'passport';
import { register, login, forgotPassword, resetPassword, resetPasswordWithToken, googleAuth, googleAuthCallback } from '../controllers/authController.js';

const router = express.Router();

// Public routes - Token නැතිව වැඩ කරයි
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/reset-password/:token', resetPasswordWithToken);

// Google OAuth routes - Only available when credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'dummy_client_id') {
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/signin' }), googleAuth);
} else {
  // Fallback routes when OAuth is not configured
  router.get('/google', (req, res) => {
    res.status(503).json({ 
      success: false, 
      message: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file.' 
    });
  });
  router.get('/google/callback', (req, res) => {
    res.status(503).json({ 
      success: false, 
      message: 'Google OAuth is not configured.' 
    });
  });
}

export default router;