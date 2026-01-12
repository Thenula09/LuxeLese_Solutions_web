const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('bookingId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single payment
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('bookingId');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payments by bookingId
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId });
    res.json(payment || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create payment
router.post('/', async (req, res) => {
  const payment = new Payment({
    userId: req.body.userId,
    bookingId: req.body.bookingId,
    amount: req.body.amount,
    carId: req.body.carId,
    date: req.body.date,
    status: req.body.status
  });

  try {
    const newPayment = await payment.save();
    req.app.locals.io.emit('dataUpdated', { type: 'payment', action: 'create' });
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update payment
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    if (req.body.userId) payment.userId = req.body.userId;
    if (req.body.bookingId) payment.bookingId = req.body.bookingId;
    if (req.body.amount) payment.amount = req.body.amount;
    if (req.body.carId) payment.carId = req.body.carId;
    if (req.body.date) payment.date = req.body.date;
    if (req.body.status) payment.status = req.body.status;

    const updatedPayment = await payment.save();
    req.app.locals.io.emit('dataUpdated', { type: 'payment', action: 'update' });
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete payment
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    req.app.locals.io.emit('dataUpdated', { type: 'payment', action: 'delete' });
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
