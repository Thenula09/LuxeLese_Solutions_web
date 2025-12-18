import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

// CORS Configuration - සියලු origins වලින් requests accept කරයි
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
  optionsSuccessStatus: 200
}));

// Body Parser Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Car Rental API is running!',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handling middleware
app.use((err, req, res) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    error: err.stack
  });
});

export default app;