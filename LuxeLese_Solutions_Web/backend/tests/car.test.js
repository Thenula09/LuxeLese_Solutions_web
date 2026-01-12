import request from 'supertest';
import app from '../app.js';

describe('Car API', () => {
  it('should get all cars', async () => {
    const response = await request(app)
      .get('/api/cars')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get car by id', async () => {
    // First get all cars
    const response = await request(app)
      .get('/api/cars')
      .expect(200);

    if (response.body.data.length > 0) {
      const carId = response.body.data[0]._id;
      const carResponse = await request(app)
        .get(`/api/cars/${carId}`)
        .expect(200);

      expect(carResponse.body.success).toBe(true);
      expect(carResponse.body.data._id).toBe(carId);
    }
  });
});