import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/user.model.js";
import Category from "./src/models/category.model.js";
import Product from "./src/models/product.model.js";
import Cart from "./src/models/cart.model.js";
import Order from "./src/models/order.model.js";
import OTP from "./src/models/OTP.model.js";
import Message from "./src/models/message.model.js";

dotenv.config();

const clearDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear all collections
    await User.deleteMany({});
    console.log("🗑️  Cleared Users");

    await Category.deleteMany({});
    console.log("🗑️  Cleared Categories");

    await Product.deleteMany({});
    console.log("🗑️  Cleared Products");

    await Cart.deleteMany({});
    console.log("🗑️  Cleared Carts");

    await Order.deleteMany({});
    console.log("🗑️  Cleared Orders");

    await OTP.deleteMany({});
    console.log("🗑️  Cleared OTPs");

    await Message.deleteMany({});
    console.log("🗑️  Cleared Messages");

    console.log("\n🎉 Database cleared successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error clearing database:", error.message);
    process.exit(1);
  }
};

clearDatabase();
