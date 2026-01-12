import request from 'supertest';
import app from '../app.js';

describe('Review API', () => {
  it('should get reviews for a car', async () => {
    const response = await request(app)
      .get('/api/reviews/car/507f1f77bcf86cd799439011')
      .expect(200);

    expect(Array.isArray(response.body.data.reviews)).toBe(true);
    expect(typeof response.body.data.averageRating).toBe('string');
    expect(typeof response.body.data.totalReviews).toBe('number');
  });

  it.skip('should create a review', async () => {
    // Register and login
    const userData = {
      name: 'Review User',
      email: 'reviewuser@example.com',
      password: 'password123',
      phone: '+94785152303'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'reviewuser@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.data.token;

    const reviewData = {
      rating: 5,
      comment: 'Great service!',
      bookingId: '507f1f77bcf86cd799439011'
    };

    const response = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(reviewData)
      .expect(201);

    expect(response.body.success).toBe(true);
  });
});