const mongoose = require('mongoose');

module.exports = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/online_library';
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
