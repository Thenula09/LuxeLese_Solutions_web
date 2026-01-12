const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  const booking = new Booking({
    customerName: req.body.customerName,
    email: req.body.email,
    phone: req.body.phone,
    vehicle: req.body.vehicle,
    date: req.body.date,
    duration: req.body.duration,
    totalCost: req.body.totalCost,
    status: req.body.status,
    notes: req.body.notes
  });

  try {
    const newBooking = await booking.save();
    req.app.locals.io.emit('dataUpdated', { type: 'booking', action: 'create' });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.customerName = req.body.customerName || booking.customerName;
    booking.email = req.body.email || booking.email;
    booking.phone = req.body.phone || booking.phone;
    booking.vehicle = req.body.vehicle || booking.vehicle;
    booking.date = req.body.date || booking.date;
    booking.duration = req.body.duration || booking.duration;
    booking.totalCost = req.body.totalCost || booking.totalCost;
    booking.status = req.body.status || booking.status;
    booking.notes = req.body.notes || booking.notes;

    const updatedBooking = await booking.save();
    req.app.locals.io.emit('dataUpdated', { type: 'booking', action: 'update' });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.deleteOne();
    req.app.locals.io.emit('dataUpdated', { type: 'booking', action: 'delete' });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;