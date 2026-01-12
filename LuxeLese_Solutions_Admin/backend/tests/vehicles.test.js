const request = require('supertest');
const app = require('../server');

describe('Vehicle API', () => {
  it('should get all vehicles', async () => {
    const response = await request(app)
      .get('/api/vehicles')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new vehicle', async () => {
    const vehicleData = {
      name: 'Test Car',
      brand: 'Toyota',
      category: 'Sedan',
      licensePlate: 'ABC-123',
      pricePerDay: 50,
      securityDeposit: 200,
      status: 'Available',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seatingCapacity: 5,
      mileage: '15 km/l',
      mainImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      description: 'A test car'
    };

    const response = await request(app)
      .post('/api/vehicles')
      .send(vehicleData)
      .expect(201);

    expect(response.body.name).toBe('Test Car');
    expect(response.body.brand).toBe('Toyota');
  });

  it('should get a vehicle by id', async () => {
    // First create a vehicle
    const vehicleData = {
      name: 'Test Car 2',
      brand: 'Honda',
      category: 'SUV',
      licensePlate: 'XYZ-456',
      pricePerDay: 60,
      securityDeposit: 250,
      status: 'Available',
      transmission: 'Manual',
      fuelType: 'Diesel',
      seatingCapacity: 7,
      mileage: '12 km/l',
      mainImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      description: 'Another test car'
    };

    const createResponse = await request(app)
      .post('/api/vehicles')
      .send(vehicleData);

    const vehicleId = createResponse.body._id;

    const response = await request(app)
      .get(`/api/vehicles/${vehicleId}`)
      .expect(200);

    expect(response.body.name).toBe('Test Car 2');
  });

  it('should update a vehicle', async () => {
    // First create a vehicle
    const vehicleData = {
      name: 'Test Car 3',
      brand: 'Ford',
      category: 'Sedan',
      licensePlate: 'DEF-789',
      pricePerDay: 40,
      securityDeposit: 150,
      status: 'Available',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seatingCapacity: 4,
      mileage: '18 km/l',
      mainImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      description: 'Third test car'
    };

    const createResponse = await request(app)
      .post('/api/vehicles')
      .send(vehicleData);

    const vehicleId = createResponse.body._id;

    const updateData = {
      name: 'Updated Test Car 3',
      pricePerDay: 45
    };

    const response = await request(app)
      .put(`/api/vehicles/${vehicleId}`)
      .send(updateData)
      .expect(200);

    expect(response.body.name).toBe('Updated Test Car 3');
    expect(response.body.pricePerDay).toBe(45);
  });

  it('should delete a vehicle', async () => {
    // First create a vehicle
    const vehicleData = {
      name: 'Test Car 4',
      brand: 'BMW',
      category: 'Luxury',
      licensePlate: 'GHI-012',
      pricePerDay: 100,
      securityDeposit: 500,
      status: 'Available',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seatingCapacity: 5,
      mileage: '10 km/l',
      mainImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      description: 'Luxury test car'
    };

    const createResponse = await request(app)
      .post('/api/vehicles')
      .send(vehicleData);

    const vehicleId = createResponse.body._id;

    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .expect(200);

    expect(response.body.message).toBe('Vehicle deleted');
  });
});