import request from 'supertest';
import app from '../app.js';

describe('Payment API', () => {
  let token;

  beforeAll(async () => {
    // Register and login to get token
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Payment User',
        email: 'paymentuser@example.com',
        password: 'password123',
        phone: '+94785152303'
      });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'paymentuser@example.com',
        password: 'password123'
      });

    token = loginResponse.body.data.token;
  });

  it.skip('should create payment intent', async () => {
    const paymentData = {
      amount: 15000, // in cents
      currency: 'usd',
      bookingId: '507f1f77bcf86cd799439011'
    };

    const response = await request(app)
      .post('/api/payments/create-payment-intent')
      .set('Authorization', `Bearer ${token}`)
      .send(paymentData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.clientSecret).toBeDefined();
  });

  it.skip('should confirm payment', async () => {
    const confirmData = {
      paymentIntentId: 'pi_test_123',
      bookingId: '507f1f77bcf86cd799439011'
    };

    const response = await request(app)
      .post('/api/payments/confirm-payment')
      .set('Authorization', `Bearer ${token}`)
      .send(confirmData)
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});