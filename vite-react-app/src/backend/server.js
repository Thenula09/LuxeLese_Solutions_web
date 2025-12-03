import dotenv from 'dotenv';
import connectDatabase from './config/database.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDatabase();

// Start Server
console.log('\n🚀 Backend Server Started');
console.log(`📡 Port: ${PORT}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV}\n`);