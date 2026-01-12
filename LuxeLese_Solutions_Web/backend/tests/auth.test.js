import request from 'supertest';
import app from '../app.js';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      phone: '+94785152303'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('ගිණුම සාර්ථකව නිර්මාණය කරන ලදී');
    expect(response.body.data.token).toBeDefined();
  });

  it('should login user', async () => {
    // First register
    const userData = {
      name: 'Test User',
      email: 'testuser2@example.com',
      password: 'password123',
      phone: '+94785152303'
    };

    await request(app)
      .post('/api/auth/register')
      .send(userData);

    // Then login
    const loginData = {
      email: 'testuser2@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('සාර්ථකව login විය');
    expect(response.body.data.token).toBeDefined();
  });
});