const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single vehicle
router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new vehicle
router.post('/', async (req, res) => {
  console.log('Received vehicle data:', JSON.stringify(req.body, null, 2));
  console.log('Request body keys:', Object.keys(req.body));
  console.log('Main image present:', !!req.body.mainImage);
  console.log('Main image length:', req.body.mainImage ? req.body.mainImage.length : 'N/A');
  console.log('Features:', req.body.features);
  console.log('Features type:', typeof req.body.features);
  console.log('Features is array:', Array.isArray(req.body.features));

  const vehicle = new Vehicle({
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    licensePlate: req.body.licensePlate,
    pricePerDay: parseFloat(req.body.pricePerDay) || 0,
    securityDeposit: parseFloat(req.body.securityDeposit) || 0,
    status: req.body.status,
    transmission: req.body.transmission,
    fuelType: req.body.fuelType,
    seatingCapacity: parseInt(req.body.seatingCapacity) || 1,
    mileage: req.body.mileage,
    mainImage: req.body.mainImage,
    galleryImages: req.body.galleryImages || [],
    description: req.body.description || '',
    features: req.body.features || []
  });

  console.log('Vehicle object before save:', JSON.stringify(vehicle, null, 2));

  try {
    const newVehicle = await vehicle.save();
    req.app.locals.io.emit('dataUpdated', { type: 'vehicle', action: 'create' });
    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Update fields with proper type conversion
    if (req.body.name !== undefined) vehicle.name = req.body.name;
    if (req.body.brand !== undefined) vehicle.brand = req.body.brand;
    if (req.body.category !== undefined) vehicle.category = req.body.category;
    if (req.body.licensePlate !== undefined) vehicle.licensePlate = req.body.licensePlate;
    if (req.body.pricePerDay !== undefined) vehicle.pricePerDay = parseFloat(req.body.pricePerDay) || 0;
    if (req.body.securityDeposit !== undefined) vehicle.securityDeposit = parseFloat(req.body.securityDeposit) || 0;
    if (req.body.status !== undefined) vehicle.status = req.body.status;
    if (req.body.transmission !== undefined) vehicle.transmission = req.body.transmission;
    if (req.body.fuelType !== undefined) vehicle.fuelType = req.body.fuelType;
    if (req.body.seatingCapacity !== undefined) vehicle.seatingCapacity = parseInt(req.body.seatingCapacity) || 1;
    if (req.body.mileage !== undefined) vehicle.mileage = req.body.mileage;
    if (req.body.mainImage !== undefined) vehicle.mainImage = req.body.mainImage;
    if (req.body.galleryImages !== undefined) vehicle.galleryImages = req.body.galleryImages || [];
    if (req.body.description !== undefined) vehicle.description = req.body.description || '';
    if (req.body.features !== undefined) vehicle.features = req.body.features || [];

    const updatedVehicle = await vehicle.save();
    req.app.locals.io.emit('dataUpdated', { type: 'vehicle', action: 'update' });
    res.json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    req.app.locals.io.emit('dataUpdated', { type: 'vehicle', action: 'delete' });
    res.json({ message: 'Vehicle deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;