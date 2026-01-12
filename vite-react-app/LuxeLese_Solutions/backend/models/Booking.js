import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String },
  address: { type: String, required: true },
  additionalNote: { type: String },
  selectedDates: [{ type: Date, required: true }],
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  numberOfDays: { type: Number, required: false, default: 0 },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  carName: { type: String, required: true },
  carImage: { type: String, required: false },
  totalCost: { type: Number, required: false, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled', 'completed'] },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
