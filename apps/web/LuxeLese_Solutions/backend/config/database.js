import mongoose from 'mongoose';
import process from 'process';

const connectDatabase = async () => {
  try {
    // Connection options for newer mongoose versions
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log('✅ MongoDB Connected Successfully!');
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🔗 Host: ${conn.connection.host}`);
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed:', error.message);
    console.error('\n⚠️  TROUBLESHOOTING STEPS:');
    console.error('   1. Check your internet connection');
    console.error('   2. Verify MongoDB Atlas cluster is running');
    console.error('   3. Check if your IP is whitelisted in MongoDB Atlas');
    console.error('   4. Try accessing MongoDB Atlas dashboard');
    console.error('   5. Update MONGODB_URI in .env file\n');
    console.error('⚠️  Server will continue running for frontend testing');
    console.error('⚠️  Authentication features require database connection\n');
    // Don't exit - allow server to run for testing frontend
    // process.exit(1);
  }
};

export default connectDatabase;