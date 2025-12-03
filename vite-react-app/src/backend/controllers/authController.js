import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import process from 'process';

// JWT Token generate කරනවා
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'කරුණාකර නම, email සහ password ලබා දෙන්න'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'වලංගු email address එකක් ලබා දෙන්න'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුයි'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'මෙම email address එක දැනටමත් භාවිතා වේ'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = generateToken(user._id);

    // Send success response
    return res.status(201).json({
      success: true,
      message: 'ගිණුම සාර්ථකව නිර්මාණය කරන ලදී',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'මෙම email address එක දැනටමත් භාවිතා වේ'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    // General error
    return res.status(500).json({
      success: false,
      message: 'ගිණුම නිර්මාණය අසාර්ථක විය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'කරුණාකර email සහ password ලබා දෙන්න'
      });
    }

    // Check if user exists and get password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'වැරදි email හෝ password'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'වැරදි email හෝ password'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Send success response
    return res.status(200).json({
      success: true,
      message: 'සාර්ථකව login විය',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login අසාර්ථක විය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get Current User
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get Me Error:', error);
    return res.status(500).json({
      success: false,
      message: 'User data ලබා ගැනීම අසාර්ථක විය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User හමු නොවීය'
      });
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'වලංගු email address එකක් ලබා දෙන්න'
        });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(409).json({
          success: false,
          message: 'මෙම email address එක දැනටමත් භාවිතා වේ'
        });
      }
      
      user.email = email;
    }

    if (name) user.name = name;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile සාර්ථකව යාවත්කාලීන කරන ලදී',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Profile යාවත්කාලීන අසාර්ථක විය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'කරුණාකර වත්මන් password සහ නව password ලබා දෙන්න'
      });
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'නව password අවම වශයෙන් අක්ෂර 6ක් තිබිය යුතුයි'
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');

    // Check current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'වත්මන් password වැරදියි'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Generate new token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password සාර්ථකව වෙනස් කරන ලදී',
      data: {
        token
      }
    });
  } catch (error) {
    console.error('Change Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Password වෙනස් කිරීම අසාර්ථක විය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};