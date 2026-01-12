import request from 'supertest';
import app from '../app.js';

describe('Profile API', () => {
  it('should get user profile', async () => {
    // Register and login
    const userData = {
      name: 'Profile User',
      email: 'profileuser@example.com',
      password: 'password123',
      phone: '+94785152303'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'profileuser@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
  });

  it('should update user profile', async () => {
    // Similar setup
    const userData = {
      name: 'Profile User 2',
      email: 'profileuser2@example.com',
      password: 'password123',
      phone: '+94785152303'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'profileuser2@example.com',
        password: 'password123'
      });

    const token = loginResponse.body.data.token;

    const updateData = {
      name: 'Updated Name'
    };

    const response = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});