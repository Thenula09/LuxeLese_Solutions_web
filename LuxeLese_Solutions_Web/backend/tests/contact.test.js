import request from 'supertest';
import app from '../app.js';

describe('Contact API', () => {
  it('should create a new contact', async () => {
    const contactData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+94785152303',
      subject: 'Test Subject',
      message: 'This is a test message'
    };

    const response = await request(app)
      .post('/api/contact')
      .send(contactData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Your message has been sent successfully! We will get back to you soon.');
  });

  it('should return error for invalid data', async () => {
    const invalidData = {
      name: '',
      email: 'invalid-email',
      phone: '123',
      subject: '',
      message: ''
    };

    const response = await request(app)
      .post('/api/contact')
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});