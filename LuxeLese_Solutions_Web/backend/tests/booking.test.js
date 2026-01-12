import request from 'supertest';
import app from '../app.js';

describe('Booking API', () => {
  it.skip('should create a new booking', async () => {
    // First register and login to get token
    const userData = {
      name: 'Test User',
      email: 'bookinguser@example.com',
      password: 'password123',
      phone: '+94785152303'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'bookinguser@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.data.token;

    const bookingData = {
      fullName: 'Test User',
      email: 'bookinguser@example.com',
      phoneNumber: '+94785152303',
      address: '123 Test Street',
      selectedDates: ['2026-01-15', '2026-01-16', '2026-01-17'],
      carId: '507f1f77bcf86cd799439011', // dummy id
      carName: 'Test Car'
    };

    const response = await request(app)
      .post('/api/bookings')
      .send(bookingData)
      .expect(201);

    expect(response.body.success).toBe(true);
  });

  it('should get booked dates for a car', async () => {
    const response = await request(app)
      .get('/api/bookings/booked-dates/507f1f77bcf86cd799439011')
      .expect(200);

    expect(Array.isArray(response.body.bookedDates)).toBe(true);
  });
});