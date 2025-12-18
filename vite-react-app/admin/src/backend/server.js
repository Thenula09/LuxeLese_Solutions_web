import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from admin root directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'LuxeLese Admin API Server' });
});

// Admin API routes will be added here
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalCars: 45,
    activeBookings: 23,
    totalUsers: 350,
    revenue: 45230
  });
});

app.get('/api/admin/bookings', (req, res) => {
  res.json([
    {
      id: '001',
      customer: 'John Doe',
      car: 'Mercedes S-Class',
      date: '2024-12-15',
      status: 'active'
    },
    {
      id: '002',
      customer: 'Jane Smith',
      car: 'BMW 7 Series',
      date: '2024-12-14',
      status: 'completed'
    }
  ]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Admin API server running on port ${PORT}`);
});

export default app;
