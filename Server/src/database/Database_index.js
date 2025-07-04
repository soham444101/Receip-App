import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

const ConnectDB = async () => {
  try {
    // Log the MongoDB URI to confirm it's being loaded correctly
    console.log('====================================');
    console.log(process.env.MONGO_URI);  // Now using the corrected variable name
    console.log('====================================');

    // Connect to MongoDB using Mongoose
    const connnect = await mongoose.connect(process.env.MONGO_URI);

    console.log(" MongoDB Connected Successfully",connnect.connection.host);
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

export default ConnectDB;
