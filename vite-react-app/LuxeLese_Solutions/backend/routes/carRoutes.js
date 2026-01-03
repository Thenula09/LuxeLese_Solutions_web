import express from 'express';
import {
  getAllCars,
  getCarById,
  addCar,
  updateCar,
  deleteCar,
  searchCars
} from '../controllers/carController.js';

const router = express.Router();

// Public routes
router.get('/', getAllCars);
router.get('/search', searchCars);
router.get('/:id', getCarById);

// Admin routes (you might want to add authentication middleware here)
router.post('/', addCar);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);

export default router;
