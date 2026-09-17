import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/monastery360";
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    console.log("⚠️  Starting server without database connection...");
    console.log("💡 To fix this:");
    console.log("   1. Install MongoDB locally, OR");
    console.log("   2. Use MongoDB Atlas (free cloud database)");
    console.log("   3. Update MONGODB_URI in .env file");
    return false;
  }
};

export default connectDB;