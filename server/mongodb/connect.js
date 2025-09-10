import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log('✅ Connected to MongoDB successfully');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:');
    console.error('URL:', url ? 'Set' : 'NOT SET');
    console.error('Error:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

export default connectDB;
