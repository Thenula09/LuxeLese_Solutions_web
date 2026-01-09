import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import process from 'process';
import sendEmail from './sendEmail.js';
import crypto from 'crypto';

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
      message: 'Login   අසාර්ථක විය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'මෙම email address එකతో user කෙනෙක් නැත',
      });
    }

    // 2) Generate the random OTP
    const otp = user.createOTP();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const message = `ඔබේ password reset කිරීමට, කරුණාකර මෙම OTP code එක භාවිතා කරන්න: ${otp}. \n\nඔබ password reset කිරීමට ඉල්ලුවේ නැත්නම්, කරුණාකර මෙම email එක නොසලකා හරින්න.`;

    console.log(`🔄 Sending OTP ${otp} to ${user.email}`);

    try {
      await sendEmail({
        email: user.email,
        subject: 'ඔබේ password reset OTP code එක (විනාඩි 10කින් කල් ඉකුත් වේ)',
        message,
      });

      console.log(`✅ Forgot password success for ${user.email}`);
      res.status(200).json({
        success: true,
        message: 'Code එක email එකට යවන ලදී!',
        ...(process.env.NODE_ENV === 'development' && { otp: otp }) // Return OTP in development for testing
      });
    } catch (err) {
      console.error(`❌ Forgot password failed for ${user.email}:`, err.message);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email එක යැවීමේදී දෝෂයක් ඇතිවිය. කරුණාකර නැවත උත්සාහ කරන්න.',
      });
    }
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'දෝෂයක් ඇතිවිය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    // 1) Get user based on the OTP
    const hashedOTP = crypto
      .createHash('sha256')
      .update(req.body.otp)
      .digest('hex');

    const user = await User.findOne({
      otp: hashedOTP,
      otpExpires: { $gt: Date.now() },
    });

    // 2) If OTP has not expired, and there is user, log them in directly
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'OTP එක වැරදියි හෝ කල් ඉකුත් වී ඇත',
      });
    }

    // 3) Clear the OTP and log the user in
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // 4) Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'OTP verified successfully! You are now logged in.',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({
      success: false,
      message: 'OTP verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
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
      message: 'User.  data ලබා ගැනීම අසාර්ථක විය',
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
        message: 'User not හමු නොවීය'
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

export const resetPasswordWithToken = async (req, res) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token එක වැරදියි හෝ කල් ඉකුත් වී ඇත',
      });
    }

    // 3) Update password
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 4) Log the user in, send JWT
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Password reset සාර්ථකයි',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Reset Password with Token Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Password reset කිරීමේදී දෝෂයක් ඇතිවිය',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};