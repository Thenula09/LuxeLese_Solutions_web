import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['SUV', 'Sedan', 'Luxury SUV', 'Premium Sedan', 'Electric Sedan', 'Sports', 'Luxury']
  },
  category: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: false,
    default: ''
  },
  galleryImages: [{
    type: String
  }],
  mileage: {
    type: mongoose.Schema.Types.Mixed // Can be string (image URL) or number
  },
  price: {
    type: Number,
    min: 0
  },
  securityDeposit: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    default: 'Available'
  },
  transmission: {
    type: String,
    trim: true
  },
  fuelType: {
    type: String,
    trim: true
  },
  seatingCapacity: {
    type: Number,
    min: 1
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5
  },
  users: {
    type: Number,
    default: 0,
    min: 0
  },
  features: [{
    type: String,
    trim: true
  }],
  timeFrame: {
    type: String,
    default: 'Day/Week/Month'
  },
  available: {
    type: Boolean,
    default: true
  },
  licensePlate: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'vehicles' // Use the existing 'vehicles' collection
});

// Indexes for faster query performance
carSchema.index({ category: 1 }); // Fast category filtering
carSchema.index({ status: 1 }); // Fast availability checking
carSchema.index({ price: 1 }); // Fast price sorting
carSchema.index({ createdAt: -1 }); // Fast recent cars sorting
carSchema.index({ name: 'text', category: 'text', brand: 'text' }); // Text search

const Car = mongoose.model('Car', carSchema);

export default Car;
