import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import User from "./src/models/user.model.js";
import Category from "./src/models/category.model.js";
import Product from "./src/models/product.model.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create Categories
    const categories = await Category.insertMany([
      { name: "Sofas & Couches", imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&fit=crop", productCount: 0 },
      { name: "Dining Tables", imageURL: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&fit=crop", productCount: 0 },
      { name: "Beds & Mattresses", imageURL: "https://images.unsplash.com/photo-1540932239986-310128078ceb?w=800&q=80&fit=crop", productCount: 0 },
      { name: "Office Chairs", imageURL: "https://images.unsplash.com/photo-1586023566828-23a76f6e9c40?w=800&q=80&fit=crop", productCount: 0 },
      { name: "Storage & Shelving", imageURL: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&fit=crop", productCount: 0 },
      { name: "Lighting", imageURL: "https://images.unsplash.com/photo-1565182999555-3897b850b2da?w=800&q=80&fit=crop", productCount: 0 },
    ]);
    console.log("✅ Created 6 categories");

    // Create Products
    const products = await Product.insertMany([
      // Sofas
      { title: "Modern L-Shaped Sofa", description: "Elegant modern L-shaped sofa with comfortable seating for up to 5 people.", categoryID: categories[0]._id, features: ["L-shaped design", "Dark gray", "5-person capacity"], price: 1299, discountPrice: 999, stock: 8, imageURLs: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&fit=crop"] },
      { title: "Leather Chesterfield Sofa", description: "Classic leather Chesterfield sofa with button tufting and rolled arms.", categoryID: categories[0]._id, features: ["Genuine leather", "Button tufting", "3-person seating"], price: 1899, discountPrice: 1599, stock: 5, imageURLs: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80&fit=crop"] },
      { title: "Compact Apartment Sofa", description: "Space-saving sofa perfect for small apartments.", categoryID: categories[0]._id, features: ["Compact size", "Beige color", "2-3 seating"], price: 599, discountPrice: 449, stock: 15, imageURLs: ["https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80&fit=crop"] },
      
      // Dining Tables
      { title: "Wooden Dining Table Set", description: "Beautiful wooden dining table with 6 chairs.", categoryID: categories[1]._id, features: ["Solid oak wood", "Seats 6", "Natural finish"], price: 1499, discountPrice: 1199, stock: 6, imageURLs: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&fit=crop"] },
      { title: "Glass Top Modern Dining Table", description: "Contemporary dining table with glass top and metal base.", categoryID: categories[1]._id, features: ["Glass top", "Metal base", "Seats 4"], price: 799, discountPrice: 649, stock: 10, imageURLs: ["https://images.unsplash.com/photo-1631196734685-9c6b3676220f?w=800&q=80&fit=crop"] },
      { title: "Marble Top Dining Table", description: "Luxurious marble top dining table with wooden base.", categoryID: categories[1]._id, features: ["Marble top", "Wooden base", "Seats 6"], price: 2499, discountPrice: 1999, stock: 3, imageURLs: ["https://images.unsplash.com/photo-1537530307043-67d14b831057?w=800&q=80&fit=crop"] },
      
      // Beds
      { title: "Queen Size Memory Foam Bed", description: "Comfortable queen size bed with memory foam mattress.", categoryID: categories[2]._id, features: ["Queen size", "Memory foam", "Orthopedic support"], price: 899, discountPrice: 699, stock: 12, imageURLs: ["https://images.unsplash.com/photo-1540932239986-310128078ceb?w=800&q=80&fit=crop"] },
      { title: "King Size Platform Bed", description: "Spacious king size platform bed made from solid wood.", categoryID: categories[2]._id, features: ["King size", "Solid wood", "Dark brown"], price: 1299, discountPrice: 999, stock: 7, imageURLs: ["https://images.unsplash.com/photo-1611186871348-b526f193b822?w=800&q=80&fit=crop"] },
      { title: "Twin Size Loft Bed", description: "Multi-functional twin size loft bed with storage.", categoryID: categories[2]._id, features: ["Twin size", "Loft design", "Storage space"], price: 599, discountPrice: 449, stock: 9, imageURLs: ["https://images.unsplash.com/photo-1557370795-0af10265ff17?w=800&q=80&fit=crop"] },
      
      // Office Chairs
      { title: "Ergonomic Office Chair", description: "Premium ergonomic office chair with lumbar support.", categoryID: categories[3]._id, features: ["Lumbar support", "Adjustable armrests", "Black color"], price: 499, discountPrice: 399, stock: 20, imageURLs: ["https://images.unsplash.com/photo-1586023566828-23a76f6e9c40?w=800&q=80&fit=crop"] },
      { title: "Gaming Chair", description: "High-performance gaming chair with racing style design.", categoryID: categories[3]._id, features: ["Racing design", "Reclining backrest", "Red & black"], price: 399, discountPrice: 299, stock: 14, imageURLs: ["https://images.unsplash.com/photo-1598645108062-ec5ee34f8db4?w=800&q=80&fit=crop"] },
      { title: "Executive Office Chair", description: "Premium executive office chair with leather upholstery.", categoryID: categories[3]._id, features: ["Leather upholstery", "Padded armrests", "Brown color"], price: 699, discountPrice: 549, stock: 8, imageURLs: ["https://images.unsplash.com/photo-1541559227615-cd4628902249?w=800&q=80&fit=crop"] },
      
      // Storage
      { title: "Wooden Bookshelf", description: "Beautiful wooden bookshelf with 5 shelves.", categoryID: categories[4]._id, features: ["5 shelves", "Solid wood", "Natural finish"], price: 399, discountPrice: 299, stock: 11, imageURLs: ["https://images.unsplash.com/photo-1569281317117-e415a1fb1ff2?w=800&q=80&fit=crop"] },
      { title: "Metal Storage Cabinet", description: "Industrial style metal storage cabinet with 2 doors.", categoryID: categories[4]._id, features: ["Metal frame", "2 doors", "Gray color"], price: 549, discountPrice: 449, stock: 7, imageURLs: ["https://images.unsplash.com/photo-1532159553688-5da10a65f20b?w=800&q=80&fit=crop"] },
      { title: "Corner Storage Unit", description: "Space-saving corner storage unit for tight spaces.", categoryID: categories[4]._id, features: ["Corner design", "White color", "Compact size"], price: 299, discountPrice: 199, stock: 13, imageURLs: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop"] },
      
      // Lighting
      { title: "Pendant Light Fixture", description: "Modern pendant light fixture with adjustable height.", categoryID: categories[5]._id, features: ["Adjustable height", "Modern design", "LED compatible"], price: 129, discountPrice: 99, stock: 25, imageURLs: ["https://images.unsplash.com/photo-1565182999555-3897b850b2da?w=800&q=80&fit=crop"] },
      { title: "Floor Lamp", description: "Elegant floor lamp with fabric shade.", categoryID: categories[5]._id, features: ["Fabric shade", "Dimming feature", "Beige"], price: 179, discountPrice: 129, stock: 18, imageURLs: ["https://images.unsplash.com/photo-1565193566173-7cda82f45e65?w=800&q=80&fit=crop"] },
      { title: "Desk Lamp", description: "Compact desk lamp with LED light.", categoryID: categories[5]._id, features: ["LED light", "Adjustable arm", "Silver color"], price: 89, discountPrice: 69, stock: 30, imageURLs: ["https://images.unsplash.com/photo-1565636192335-14f4d45aed84?w=800&q=80&fit=crop"] },
    ]);
    console.log("✅ Created 18 products");

    // Update category product counts
    for (let category of categories) {
      const count = await Product.countDocuments({ categoryID: category._id });
      await Category.findByIdAndUpdate(category._id, { productCount: count });
    }
    console.log("✅ Updated category product counts");

    // Create Users
    const hashedPassword = await bcryptjs.hash("password123", 10);
    const users = await User.insertMany([
      { name: "Admin User", email: "admin@furniro.com", password: hashedPassword, isVerified: true, role: "admin", address: { city: "New York", state: "NY", zip: 10001 } },
      { name: "John Doe", email: "john@example.com", password: hashedPassword, isVerified: true, role: "customer", address: { city: "Los Angeles", state: "CA", zip: 90001 } },
      { name: "Jane Smith", email: "jane@example.com", password: hashedPassword, isVerified: true, role: "customer", address: { city: "Chicago", state: "IL", zip: 60601 } },
      { name: "Mike Johnson", email: "mike@example.com", password: hashedPassword, isVerified: true, role: "customer", address: { city: "Houston", state: "TX", zip: 77001 } },
    ]);
    console.log("✅ Created 4 users");

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   ✓ Categories: ${categories.length}`);
    console.log(`   ✓ Products: ${products.length}`);
    console.log(`   ✓ Users: ${users.length}`);
    console.log("\n🔐 Admin Credentials:");
    console.log(`   Email: admin@furniro.com`);
    console.log(`   Password: password123`);
    console.log("\n👤 Customer Credentials:");
    console.log(`   Email: john@example.com`);
    console.log(`   Password: password123`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
