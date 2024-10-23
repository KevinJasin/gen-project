const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load .env variables
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,         // Avoids deprecation warnings
      useUnifiedTopology: true,      // Avoids deprecation warnings
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);  // Exit with failure if connection fails
  }
};

module.exports = connectDB;
