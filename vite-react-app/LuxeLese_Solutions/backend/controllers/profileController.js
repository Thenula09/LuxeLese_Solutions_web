import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/profiles';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + req.user._id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -passwordResetToken -passwordResetExpires -otp -otpExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -passwordResetToken -passwordResetExpires -otp -otpExpires');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });

  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

// @desc    Upload profile picture
// @route   POST /api/profile/upload-picture
// @access  Private
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Delete old profile picture if exists
    const user = await User.findById(req.user._id);
    if (user.profilePicture) {
      const oldPicturePath = path.join('uploads/profiles', path.basename(user.profilePicture));
      if (fs.existsSync(oldPicturePath)) {
        fs.unlinkSync(oldPicturePath);
      }
    }

    // Update user with new profile picture path
    const profilePictureUrl = `/uploads/profiles/${req.file.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: profilePictureUrl },
      { new: true }
    ).select('-password -passwordResetToken -passwordResetExpires -otp -otpExpires');

    res.status(200).json({
      success: true,
      message: 'Profile picture uploaded successfully',
      data: {
        profilePicture: profilePictureUrl,
        user: updatedUser
      }
    });

  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload profile picture'
    });
  }
};

// @desc    Get user's bookings
// @route   GET /api/profile/bookings
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get bookings with populated car data
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('carId', 'name image pricePerDay brand model')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    // Get payment information for each booking
    const bookingsWithPayments = await Promise.all(
      bookings.map(async (booking) => {
        const payment = await Payment.findOne({ bookingId: booking._id })
          .select('amount status date paymentIntentId');
        
        return {
          ...booking.toObject(),
          payment: payment || null
        };
      })
    );

    const total = await Booking.countDocuments({ userId: req.user._id });

    res.status(200).json({
      success: true,
      data: bookingsWithPayments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalBookings: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings'
    });
  }
};

// @desc    Get single booking details
// @route   GET /api/profile/bookings/:id
// @access  Private
export const getUserBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id
    }).populate('carId', 'name image pricePerDay description features brand model');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Get payment information for this booking
    const payment = await Payment.findOne({ bookingId: booking._id })
      .select('amount status date paymentIntentId');

    res.status(200).json({
      success: true,
      data: {
        ...booking.toObject(),
        payment: payment || null
      }
    });

  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking details'
    });
  }
};

// @desc    Get user's payment history
// @route   GET /api/profile/payments
// @access  Private
export const getUserPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get payments with populated booking and car data
    const payments = await Payment.find({ userId: req.user._id })
      .populate({
        path: 'bookingId',
        select: 'fullName startDate endDate numberOfDays carName carImage status'
      })
      .populate({
        path: 'carId',
        select: 'name image brand model'
      })
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Payment.countDocuments({ userId: req.user._id });

    res.status(200).json({
      success: true,
      data: payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPayments: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get user payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
};

// @desc    Get booking and payment statistics
// @route   GET /api/profile/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({ userId: req.user._id });
    const confirmedBookings = await Booking.countDocuments({ 
      userId: req.user._id, 
      status: 'confirmed' 
    });
    const completedBookings = await Booking.countDocuments({ 
      userId: req.user._id, 
      status: 'completed' 
    });
    const cancelledBookings = await Booking.countDocuments({ 
      userId: req.user._id, 
      status: 'cancelled' 
    });

    // Calculate total spent
    const payments = await Payment.find({ userId: req.user._id, status: 'completed' });
    const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0);

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalSpent,
        totalPayments: payments.length
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics'
    });
  }
};