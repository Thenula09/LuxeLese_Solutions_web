import Car from '../models/Car.js';

export const getAllCars = async (filters = {}) => {
  const query = { availability: true };
  if (filters.category) query.category = filters.category;
  if (filters.search) {
    const pattern = new RegExp(filters.search, 'i');
    query.$or = [{ brand: pattern }, { model: pattern }, { category: pattern }];
  }
  return Car.find(query).sort({ createdAt: -1 });
};

export const getCarById = async (id) => {
  return Car.findById(id);
};

export const createCar = async (payload) => {
  return Car.create(payload);
};

export const updateCar = async (id, payload) => {
  return Car.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteCar = async (id) => {
  return Car.findByIdAndDelete(id);
};
