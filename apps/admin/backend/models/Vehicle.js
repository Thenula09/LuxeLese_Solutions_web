const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Sedan', 'SUV', 'Luxury', 'Sports', 'Electric']
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  securityDeposit: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'Rented', 'Maintenance'],
    default: 'Available'
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual']
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid']
  },
  seatingCapacity: {
    type: Number,
    required: true,
    min: 1,
    max: 50 // Increased max for larger vehicles
  },
  mileage: {
    type: String,
    required: true,
    trim: true
  },
  mainImage: {
    type: String, // Base64 encoded image
    required: true
  },
  galleryImages: [{
    type: String, // Base64 encoded images
  }],
  description: {
    type: String,
    trim: true
  },
  features: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);