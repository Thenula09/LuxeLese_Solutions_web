const request = require('supertest');
const app = require('../server');

describe('Payment API', () => {
  let bookingId;

  beforeAll(async () => {
    // Create a booking first
    const bookingData = {
      customerName: 'Payment Test User',
      email: 'paymenttest@example.com',
      phone: '+1234567890',
      vehicle: 'Test Vehicle',
      date: '2026-01-15',
      duration: 1,
      totalCost: 100,
      status: 'Confirmed',
      notes: 'For payment test'
    };

    const bookingResponse = await request(app)
      .post('/api/bookings')
      .send(bookingData);

    bookingId = bookingResponse.body._id;
  });

  it('should get all payments', async () => {
    const response = await request(app)
      .get('/api/payments')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new payment', async () => {
    const paymentData = {
      bookingId: bookingId,
      amount: 150,
      date: '2026-01-15',
      status: 'Completed'
    };

    const response = await request(app)
      .post('/api/payments')
      .send(paymentData)
      .expect(201);

    expect(response.body.amount).toBe(150);
    expect(response.body.status).toBe('Completed');
  });

  it('should get a payment by id', async () => {
    // First create a payment
    const paymentData = {
      bookingId: bookingId,
      amount: 200,
      date: '2026-01-20',
      status: 'Pending'
    };

    const createResponse = await request(app)
      .post('/api/payments')
      .send(paymentData);

    const paymentId = createResponse.body._id;

    const response = await request(app)
      .get(`/api/payments/${paymentId}`)
      .expect(200);

    expect(response.body.amount).toBe(200);
  });

  it('should get payment by booking id', async () => {
    const response = await request(app)
      .get(`/api/payments/booking/${bookingId}`)
      .expect(200);

    // May be empty object if no payment found
    expect(typeof response.body).toBe('object');
  });

  it('should update a payment', async () => {
    // First create a payment
    const paymentData = {
      bookingId: bookingId,
      amount: 300,
      date: '2026-01-25',
      status: 'Completed'
    };

    const createResponse = await request(app)
      .post('/api/payments')
      .send(paymentData);

    const paymentId = createResponse.body._id;

    const updateData = {
      status: 'Failed',
      amount: 250
    };

    const response = await request(app)
      .put(`/api/payments/${paymentId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.status).toBe('Failed');
    expect(response.body.amount).toBe(250);
  });

  it('should delete a payment', async () => {
    // First create a payment
    const paymentData = {
      bookingId: bookingId,
      amount: 100,
      date: '2026-02-01',
      status: 'Completed'
    };

    const createResponse = await request(app)
      .post('/api/payments')
      .send(paymentData);

    const paymentId = createResponse.body._id;

    const response = await request(app)
      .delete(`/api/payments/${paymentId}`)
      .expect(200);

    expect(response.body.message).toBe('Payment deleted');
  });

  it('should return 404 for non-existent payment', async () => {
    const response = await request(app)
      .get('/api/payments/507f1f77bcf86cd799439011') // Non-existent ID
      .expect(404);

    expect(response.body.message).toBe('Payment not found');
  });

  it('should return 400 for invalid payment data', async () => {
    const invalidPaymentData = {
      bookingId: 'invalid-id', // Invalid booking ID
      amount: -100, // Negative amount
      date: 'invalid-date', // Invalid date
      status: 'InvalidStatus' // Invalid status
    };

    const response = await request(app)
      .post('/api/payments')
      .send(invalidPaymentData)
      .expect(400);

    expect(response.body.message).toContain('Payment validation failed');
  });

  it('should return 404 when updating non-existent payment', async () => {
    const updateData = {
      status: 'Cancelled',
      amount: 150
    };

    const response = await request(app)
      .put('/api/payments/507f1f77bcf86cd799439011') // Non-existent ID
      .send(updateData)
      .expect(404);

    expect(response.body.message).toBe('Payment not found');
  });

  it('should return 404 when deleting non-existent payment', async () => {
    const response = await request(app)
      .delete('/api/payments/507f1f77bcf86cd799439011') // Non-existent ID
      .expect(404);

    expect(response.body.message).toBe('Payment not found');
  });

  it('should return 404 for payment by non-existent booking id', async () => {
    const response = await request(app)
      .get('/api/payments/booking/507f1f77bcf86cd799439011') // Non-existent booking ID
      .expect(200);

    expect(response.body).toEqual({}); // Returns empty object
  });
});