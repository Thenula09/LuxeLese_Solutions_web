const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Create a review for a booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { bookingId, rating, comment } = req.body;

    // Validate input
    if (!bookingId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Booking ID, rating, and comment are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if booking exists and belongs to user
    const booking = await Booking.findOne({ _id: bookingId, user: req.user.userId });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if review already exists
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this booking'
      });
    }

    // Create review
    const review = new Review({
      booking: bookingId,
      user: req.user.userId,
      car: booking.carId,
      rating,
      comment
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit review'
    });
  }
});

// Get review for a specific booking
router.get('/booking/:bookingId', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findOne({ 
      booking: req.params.bookingId,
      user: req.user.userId 
    }).populate('user', 'name email');

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch review'
    });
  }
});

// Get all reviews for a car
router.get('/car/:carId', async (req, res) => {
  try {
    const reviews = await Review.find({ car: req.params.carId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    res.json({
      success: true,
      data: {
        reviews,
        averageRating: averageRating.toFixed(1),
        totalReviews: reviews.length
      }
    });
  } catch (error) {
    console.error('Error fetching car reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
});

module.exports = router;
