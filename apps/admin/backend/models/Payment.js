const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    carId: mongoose.Schema.Types.ObjectId,
    date: Date,
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Completed'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
