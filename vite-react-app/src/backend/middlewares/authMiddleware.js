import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import process from 'process';

// Protect routes - JWT verify කරනවා
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'කරුණාකර පළමුව login වන්න'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User හමු නොවීය'
      });
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401).json({
      success: false,
      message: 'Token වලංගු නොවේ හෝ කල් ඉකුත් වී ඇත'
    });
  }
};

// Admin only access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Admin පමණක් ප්‍රවේශ විය හැක'
    });
  }
};
