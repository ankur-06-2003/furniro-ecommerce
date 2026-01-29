import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined in .env file");
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      retryWrites: true,
      w: "majority",
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`📍 Connected to: ${conn.connection.host}:${conn.connection.port}`);
    
    return conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    
    // Retry connection after 5 seconds
    console.log("🔄 Retrying connection in 5 seconds...");
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

export default connectDB;
