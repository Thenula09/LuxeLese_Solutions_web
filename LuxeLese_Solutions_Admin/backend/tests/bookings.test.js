const request = require('supertest');
const app = require('../server');

describe('Booking API', () => {
  it('should get all bookings', async () => {
    const response = await request(app)
      .get('/api/bookings')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new booking', async () => {
    const bookingData = {
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      vehicle: 'Toyota Camry',
      date: '2026-01-15',
      duration: 3,
      totalCost: 150,
      status: 'Confirmed',
      notes: 'Test booking'
    };

    const response = await request(app)
      .post('/api/bookings')
      .send(bookingData)
      .expect(201);

    expect(response.body.customerName).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
  });

  it('should get a booking by id', async () => {
    // First create a booking
    const bookingData = {
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      vehicle: 'Honda Civic',
      date: '2026-01-20',
      duration: 2,
      totalCost: 100,
      status: 'Pending',
      notes: 'Another test booking'
    };

    const createResponse = await request(app)
      .post('/api/bookings')
      .send(bookingData);

    const bookingId = createResponse.body._id;

    const response = await request(app)
      .get(`/api/bookings/${bookingId}`)
      .expect(200);

    expect(response.body.customerName).toBe('Jane Smith');
  });

  it('should update a booking', async () => {
    // First create a booking
    const bookingData = {
      customerName: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1122334455',
      vehicle: 'Ford Focus',
      date: '2026-01-25',
      duration: 1,
      totalCost: 50,
      status: 'Confirmed',
      notes: 'Third test booking'
    };

    const createResponse = await request(app)
      .post('/api/bookings')
      .send(bookingData);

    const bookingId = createResponse.body._id;

    const updateData = {
      status: 'Confirmed',
      notes: 'Updated notes'
    };

    const response = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.status).toBe('Confirmed');
    expect(response.body.notes).toBe('Updated notes');
  });

  it('should delete a booking', async () => {
    // First create a booking
    const bookingData = {
      customerName: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+5566778899',
      vehicle: 'BMW X3',
      date: '2026-02-01',
      duration: 4,
      totalCost: 400,
      status: 'Confirmed',
      notes: 'Luxury booking'
    };

    const createResponse = await request(app)
      .post('/api/bookings')
      .send(bookingData);

    const bookingId = createResponse.body._id;

    const response = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .expect(200);

    expect(response.body.message).toBe('Booking deleted');
  });

  it('should return 404 for non-existent booking', async () => {
    const response = await request(app)
      .get('/api/bookings/507f1f77bcf86cd799439011') // Non-existent ID
      .expect(404);

    expect(response.body.message).toBe('Booking not found');
  });

  it('should return 400 for invalid booking data', async () => {
    const invalidBookingData = {
      customerName: '', // Empty name
      email: 'invalid-email', // Invalid email
      phone: '123', // Invalid phone
      vehicle: 'Toyota Camry',
      date: 'invalid-date', // Invalid date
      duration: -1, // Negative duration
      totalCost: 150,
      status: 'Confirmed',
      notes: 'Test booking'
    };

    const response = await request(app)
      .post('/api/bookings')
      .send(invalidBookingData)
      .expect(400);

    expect(response.body.message).toContain('Booking validation failed');
  });

  it('should return 404 when updating non-existent booking', async () => {
    const updateData = {
      status: 'Cancelled',
      notes: 'Updated notes'
    };

    const response = await request(app)
      .put('/api/bookings/507f1f77bcf86cd799439011') // Non-existent ID
      .send(updateData)
      .expect(404);

    expect(response.body.message).toBe('Booking not found');
  });

  it('should return 404 when deleting non-existent booking', async () => {
    const response = await request(app)
      .delete('/api/bookings/507f1f77bcf86cd799439011') // Non-existent ID
      .expect(404);

    expect(response.body.message).toBe('Booking not found');
  });
});