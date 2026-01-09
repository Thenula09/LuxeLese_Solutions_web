import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import { sendPaymentSuccessNotification } from './notificationController.js';

let stripe = null;

const getStripe = () => {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('STRIPE_SECRET_KEY not set - using demo mode');
      return null;
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

// Demo mode for testing without Stripe keys
const createDemoPaymentIntent = async (amount, bookingId) => {
  return {
    id: `pi_demo_${Date.now()}`,
    client_secret: `${Date.now()}_secret_demo${Math.random().toString(36).slice(2)}`
  };
};

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    if (!amount || !bookingId || !req.user) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Get booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    let paymentIntent;
    const stripeClient = getStripe();

    if (stripeClient) {
      // Use real Stripe
      paymentIntent = await stripeClient.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects amount in cents
        currency: 'usd',
        metadata: {
          bookingId: bookingId.toString(),
          userId: req.user._id.toString(),
          carId: booking.carId.toString()
        },
        description: `Car rental booking for ${booking.fullName}`
      });
    } else {
      // Use demo mode
      paymentIntent = await createDemoPaymentIntent(amount, bookingId);
    }

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      demoMode: !stripeClient
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, bookingId } = req.body;

    if (!paymentIntentId || !bookingId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Get booking details
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    let paymentStatus = 'succeeded';
    let amount = booking.selectedDates?.length * (booking.pricePerDay || 30) || 0;

    // If Stripe is available, verify with Stripe
    const stripeClient = getStripe();
    if (stripeClient && !paymentIntentId.includes('demo')) {
      try {
        const paymentIntent = await stripeClient.paymentIntents.retrieve(paymentIntentId);
        paymentStatus = paymentIntent.status;
        amount = paymentIntent.amount / 100;
      } catch (error) {
        console.error('Stripe verification error:', error);
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
      }
    }

    if (paymentStatus === 'succeeded') {
      // Save payment details
      const payment = new Payment({
        userId: req.user._id,
        bookingId: bookingId,
        amount: amount,
        carId: booking.carId
      });

      const savedPayment = await payment.save();

      // Send WhatsApp notification
      try {
        const bookingDetails = {
          carName: booking.carName,
          date: booking.selectedDates?.join(', ') || 'N/A',
          amount: amount
        };
        
        // Send notification if WhatsApp number is available
        if (booking.whatsappNumber) {
          await sendPaymentSuccessNotification(booking.whatsappNumber, bookingDetails);
        } else if (booking.phoneNumber) {
          // Fallback to phone number if WhatsApp not provided
          await sendPaymentSuccessNotification(booking.phoneNumber, bookingDetails);
        }
      } catch (notificationError) {
        console.error('WhatsApp notification failed:', notificationError);
        // Don't fail the payment if notification fails
      }

      res.status(200).json({ 
        success: true, 
        message: 'Payment confirmed and saved successfully',
        data: {
          paymentId: savedPayment._id,
          bookingId: bookingId,
          amount: savedPayment.amount,
          status: 'completed'
        }
      });
    } else {
      res.status(400).json({ success: false, message: 'Payment not successful. Status: ' + paymentStatus });
    }
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};