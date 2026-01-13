const request = require('supertest');
const app = require('../server');

describe('Upload API', () => {
  it('should upload single image', async () => {
    // Create a mock image buffer (small PNG)
    const imageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

    const response = await request(app)
      .post('/api/uploads/single')
      .attach('image', imageBuffer, 'test.png')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.image).toBeDefined();
    expect(typeof response.body.image).toBe('string');
    expect(response.body.image.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('should upload multiple images', async () => {
    // Create mock image buffers
    const imageBuffer1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');
    const imageBuffer2 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

    const response = await request(app)
      .post('/api/uploads/multiple')
      .attach('images', imageBuffer1, 'test1.png')
      .attach('images', imageBuffer2, 'test2.png')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.images)).toBe(true);
    expect(response.body.images.length).toBe(2);
    expect(response.body.count).toBe(2);
  });

  it('should return error for no image in single upload', async () => {
    const response = await request(app)
      .post('/api/uploads/single')
      .expect(400);

    expect(response.body.message).toBe('No image file provided');
  });

  it('should return error for no images in multiple upload', async () => {
    const response = await request(app)
      .post('/api/uploads/multiple')
      .expect(400);

    expect(response.body.message).toBe('No image files provided');
  });

  it('should handle large image upload', async () => {
    // Create a larger mock image buffer (still small for testing)
    const largeImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

    const response = await request(app)
      .post('/api/uploads/single')
      .attach('image', largeImageBuffer, 'large-test.png')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.image).toBeDefined();
  });
});