import mongoose from 'mongoose';

const connectDB = async (url) => {
  if (!url) {
    console.log('MongoDB URL not provided. Please set MONGODB_URL in your environment variables.');
    return;
  }
  
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};

export default connectDB;
