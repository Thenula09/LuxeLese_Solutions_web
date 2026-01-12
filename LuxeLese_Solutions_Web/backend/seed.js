import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

const users = [
  {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  }
];

const cars = [
  {
    name: "BMW X5",
    model: "Luxury SUV",
    type: "SUV",
    category: "Luxury SUV",
    pricePerDay: 150,
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    users: 150,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
    timeFrame: "Day/Week/Month"
  },
  {
    name: "BMW X5",
    model: "Luxury SUV",
    type: "SUV",
    category: "Luxury SUV",
    pricePerDay: 150,
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    users: 150,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
    timeFrame: "Day/Week/Month"
  },
  {
    name: "Mercedes C-Class",
    model: "Premium Sedan",
    type: "Sedan",
    category: "Premium Sedan",
    pricePerDay: 120,
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    users: 180,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
    timeFrame: "Day/Week/Month"
  },
  {
    name: "Toyota Land Cruiser",
    model: "Premium SUV",
    type: "SUV",
    category: "Premium SUV",
    pricePerDay: 180,
    image: "https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    users: 120,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
    timeFrame: "Day/Week/Month"
  },
  {
    name: "Audi A6",
    model: "Luxury Sedan",
    type: "Sedan",
    category: "Luxury Sedan",
    pricePerDay: 140,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    users: 130,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
    timeFrame: "Day/Week/Month"
  },
  {
    name: "Range Rover Sport",
    model: "Premium SUV",
    type: "SUV",
    category: "Premium SUV",
    pricePerDay: 200,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    users: 200,
    features: ['Automatic', 'Air Conditioning', 'GPS', 'Bluetooth'],
    timeFrame: "Day/Week/Month"
  },
  {
    name: "Tesla Model S",
    model: "Electric Sedan",
    type: "Sedan",
    category: "Electric Sedan",
    pricePerDay: 160,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    users: 175,
    features: ['Electric', 'Autopilot', 'GPS', 'Premium Audio'],
    timeFrame: "Day/Week/Month"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Car.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new users
    const insertedUsers = await User.insertMany(users);
    console.log(`👤 Successfully seeded ${insertedUsers.length} users`);

    // Insert new cars
    const insertedCars = await Car.insertMany(cars);
    console.log(`🚗 Successfully seeded ${insertedCars.length} cars`);

    // Disconnect
    await mongoose.disconnect();
    console.log('📪 Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();