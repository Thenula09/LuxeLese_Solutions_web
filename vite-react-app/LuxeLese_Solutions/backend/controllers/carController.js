import Car from '../models/Car.js';

// Simple in-memory cache (5 minutes)
let carsCache = {
  data: null,
  timestamp: null,
  ttl: 5 * 60 * 1000 // 5 minutes
};

// Get all cars - Optimized with pagination & caching
export const getAllCars = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Check cache
    const now = Date.now();
    if (carsCache.data && carsCache.timestamp && (now - carsCache.timestamp < carsCache.ttl)) {
      console.log('✅ Serving from cache');
      const paginatedData = carsCache.data.slice(skip, skip + limit);
      return res.status(200).json({
        success: true,
        count: paginatedData.length,
        total: carsCache.data.length,
        page,
        totalPages: Math.ceil(carsCache.data.length / limit),
        data: paginatedData,
        cached: true
      });
    }

    // Fetch from database with optimizations
    const cars = await Car.find({})
      .select('name brand category price pricePerDay galleryImages mileage image rating transmission fuelType seatingCapacity status licensePlate securityDeposit features')
      .lean()
      .sort({ createdAt: -1 })
    
    // Fast transform with minimal operations
    const transformedCars = cars.map(car => ({
      _id: car._id,
      name: car.name,
      brand: car.brand,
      model: car.category,
      type: car.category,
      category: car.category,
      pricePerDay: car.price || car.pricePerDay || 100,
      image: (car.galleryImages?.[0]) || (typeof car.mileage === 'string' && car.mileage.includes('http') ? car.mileage : car.image) || '',
      rating: car.rating || 4.5,
      users: 0,
      features: car.features || [car.transmission, car.fuelType, car.seatingCapacity && `${car.seatingCapacity} Seats`].filter(Boolean),
      timeFrame: 'Day/Week/Month',
      available: car.status !== 'Unavailable',
      licensePlate: car.licensePlate,
      transmission: car.transmission,
      fuelType: car.fuelType,
      seatingCapacity: car.seatingCapacity,
      securityDeposit: car.securityDeposit
    }));

    // Update cache
    carsCache = {
      data: transformedCars,
      timestamp: now,
      ttl: carsCache.ttl
    };
    console.log(`✅ Cached ${transformedCars.length} cars`);

    // Return paginated results
    const paginatedData = transformedCars.slice(skip, skip + limit);
    res.status(200).json({
      success: true,
      count: paginatedData.length,
      total: transformedCars.length,
      page,
      totalPages: Math.ceil(transformedCars.length / limit),
      data: paginatedData,
      cached: false
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cars'
    });
  }
};

// Get single car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching car'
    });
  }
};

// Add new car (admin function)
export const addCar = async (req, res) => {
  try {
    const { name, model, type, category, pricePerDay, image, rating, users, features, timeFrame } = req.body;

    // Validation
    if (!name || !model || !type || !category || !pricePerDay || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, model, type, category, pricePerDay, image'
      });
    }

    const newCar = new Car({
      name,
      model,
      type,
      category,
      pricePerDay,
      image,
      rating: rating || 0,
      users: users || 0,
      features: features || [],
      timeFrame: timeFrame || 'Day/Week/Month'
    });

    const savedCar = await newCar.save();

    res.status(201).json({
      success: true,
      message: 'Car added successfully',
      data: savedCar
    });
  } catch (error) {
    console.error('Error adding car:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while adding car'
    });
  }
};

// Update car
export const updateCar = async (req, res) => {
  try {
    // Remove status from req.body to prevent updating status
    const { status, ...updateData } = req.body;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car updated successfully',
      data: car
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating car'
    });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting car'
    });
  }
};

// Search cars
export const searchCars = async (req, res) => {
  try {
    const { query, type, category } = req.query;

    let filter = { available: true };

    if (type) filter.type = type;
    if (category) filter.category = category;

    let cars;
    if (query) {
      cars = await Car.find({
        ...filter,
        $text: { $search: query }
      }).sort({ score: { $meta: 'textScore' } });
    } else {
      cars = await Car.find(filter).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Error searching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching cars'
    });
  }
};
