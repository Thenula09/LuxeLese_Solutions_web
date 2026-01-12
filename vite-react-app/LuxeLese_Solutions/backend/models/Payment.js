import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  carName: {
    type: String,
    required: false
  },
  carImage: {
    type: String,
    required: false
  },
  paymentIntentId: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'completed',
    enum: ['completed', 'failed', 'refunded']
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;