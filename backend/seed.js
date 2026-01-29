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
    // await User.deleteMany({});
    // await Category.deleteMany({});
    // await Product.deleteMany({});
    // console.log("🗑️  Cleared existing data");

    // Create Categories
    const categories = await Category.insertMany([
      { name: "Sofas & Couches", imageURL: "https://images.unsplash.com/photo-1721618877249-2a34c7531b47?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNvZmFzJTIwJTI2JTIwQ291Y2hlc3xlbnwwfHwwfHx8MA%3D%3D", productCount: 0 },
      { name: "Dining Tables", imageURL: "https://images.unsplash.com/photo-1539624831128-04618668ce81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fERpbmluZyUyMFRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D", productCount: 0 },
      { name: "Beds & Mattresses", imageURL: "https://images.unsplash.com/photo-1743748978909-169017ab0720?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8QmVkcyUyMCUyNiUyME1hdHRyZXNzZXN8ZW58MHx8MHx8fDA%3D", productCount: 0 },
      { name: "Office Chairs", imageURL: "https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8T2ZmaWNlJTIwQ2hhaXJzfGVufDB8fDB8fHww", productCount: 0 },
      { name: "Storage & Shelving", imageURL: "https://images.unsplash.com/photo-1588111948296-83a8e036e004?q=80&w=1011&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", productCount: 0 },
      { name: "Lighting", imageURL: "https://images.unsplash.com/photo-1515948725-edac7b5bb0fc?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", productCount: 0 },
    ]);
    console.log("✅ Created 6 categories");

    // Create Products
    const products = await Product.insertMany([
      // Sofas
      { title: "Modern L-Shaped Sofa", description: "Elegant modern L-shaped sofa with comfortable seating for up to 5 people.", categoryID: categories[0]._id, features: ["L-shaped design", "Dark gray", "5-person capacity"], price: 1299, discountPrice: 999, stock: 8, imageURLs: ["https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29mYXxlbnwwfHwwfHx8MA%3D%3D"] },
      { title: "Leather Chesterfield Sofa", description: "Classic leather Chesterfield sofa with button tufting and rolled arms.", categoryID: categories[0]._id, features: ["Genuine leather", "Button tufting", "3-person seating"], price: 1899, discountPrice: 1599, stock: 5, imageURLs: ["https://images.unsplash.com/photo-1648657458755-74ceaf075f18?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGVhdGhlciUyMENoZXN0ZXJmaWVsZCUyMFNvZmF8ZW58MHx8MHx8fDA%3D"] },
      { title: "Compact Apartment Sofa", description: "Space-saving sofa perfect for small apartments.", categoryID: categories[0]._id, features: ["Compact size", "Beige color", "2-3 seating"], price: 599, discountPrice: 449, stock: 15, imageURLs: ["https://images.unsplash.com/photo-1605365070248-299a182a2ca6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q29tcGFjdCUyMEFwYXJ0bWVudCUyMFNvZmF8ZW58MHx8MHx8fDA%3D"] },
      
      // Dining Tables
      { title: "Wooden Dining Table Set", description: "Beautiful wooden dining table with 6 chairs.", categoryID: categories[1]._id, features: ["Solid oak wood", "Seats 6", "Natural finish"], price: 1499, discountPrice: 1199, stock: 6, imageURLs: ["https://images.unsplash.com/photo-1758977403341-0104135995af?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29vZGVuJTIwRGluaW5nJTIwVGFibGUlMjBTZXR8ZW58MHx8MHx8fDA%3D"] },
      { title: "Glass Top Modern Dining Table", description: "Contemporary dining table with glass top and metal base.", categoryID: categories[1]._id, features: ["Glass top", "Metal base", "Seats 4"], price: 799, discountPrice: 649, stock: 10, imageURLs: ["https://images.unsplash.com/photo-1578745747984-cddd3a143d43?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEdsYXNzJTIwVG9wJTIwTW9kZXJuJTIwRGluaW5nJTIwVGFibGV8ZW58MHx8MHx8fDA%3D"] },
      { title: "Marble Top Dining Table", description: "Luxurious marble top dining table with wooden base.", categoryID: categories[1]._id, features: ["Marble top", "Wooden base", "Seats 6"], price: 2499, discountPrice: 1999, stock: 3, imageURLs: ["https://images.unsplash.com/photo-1681997963595-5e462b76d19c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWFyYmxlJTIwVG9wJTIwRGluaW5nJTIwVGFibGV8ZW58MHx8MHx8fDA%3D"] },
      
      // Beds
      { title: "Queen Size Memory Foam Bed", description: "Comfortable queen size bed with memory foam mattress.", categoryID: categories[2]._id, features: ["Queen size", "Memory foam", "Orthopedic support"], price: 899, discountPrice: 699, stock: 12, imageURLs: ["https://images.unsplash.com/photo-1702660122982-7b2f8d49111a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8UXVlZW4lMjBTaXplJTIwTWVtb3J5JTIwRm9hbSUyMEJlZHxlbnwwfHwwfHx8MA%3D%3D"] },
      { title: "King Size Platform Bed", description: "Spacious king size platform bed made from solid wood.", categoryID: categories[2]._id, features: ["King size", "Solid wood", "Dark brown"], price: 1299, discountPrice: 999, stock: 7, imageURLs: ["https://images.unsplash.com/photo-1631048834949-1df85dc7b02f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEtpbmclMjBTaXplJTIwUGxhdGZvcm0lMjBCZWR8ZW58MHx8MHx8fDA%3D"] },
      { title: "Twin Size Loft Bed", description: "Multi-functional twin size loft bed with storage.", categoryID: categories[2]._id, features: ["Twin size", "Loft design", "Storage space"], price: 599, discountPrice: 449, stock: 9, imageURLs: ["https://images.unsplash.com/photo-1623286728232-9107cb8f6b11?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VHdpbiUyMFNpemUlMjBMb2Z0JTIwQmVkfGVufDB8fDB8fHww"] },
      
      // Office Chairs
      { title: "Ergonomic Office Chair", description: "Premium ergonomic office chair with lumbar support.", categoryID: categories[3]._id, features: ["Lumbar support", "Adjustable armrests", "Black color"], price: 499, discountPrice: 399, stock: 20, imageURLs: ["https://images.unsplash.com/photo-1688578735427-994ecdea3ea4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXJnb25vbWljJTIwT2ZmaWNlJTIwQ2hhaXJ8ZW58MHx8MHx8fDA%3D"] },
      { title: "Gaming Chair", description: "High-performance gaming chair with racing style design.", categoryID: categories[3]._id, features: ["Racing design", "Reclining backrest", "Red & black"], price: 399, discountPrice: 299, stock: 14, imageURLs: ["https://images.unsplash.com/photo-1670946839270-cc4febd43b09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2FtaW5nJTIwQ2hhaXJ8ZW58MHx8MHx8fDA%3D"] },
      { title: "Executive Office Chair", description: "Premium executive office chair with leather upholstery.", categoryID: categories[3]._id, features: ["Leather upholstery", "Padded armrests", "Brown color"], price: 699, discountPrice: 549, stock: 8, imageURLs: ["https://images.unsplash.com/photo-1683836809851-9e3aad661ffd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FtaW5nJTIwQ2hhaXJFeGVjdXRpdmUlMjBPZmZpY2UlMjBDaGFpcnxlbnwwfHwwfHx8MA%3D%3D"] },
      
      // Storage
      { title: "Wooden Bookshelf", description: "Beautiful wooden bookshelf with 5 shelves.", categoryID: categories[4]._id, features: ["5 shelves", "Solid wood", "Natural finish"], price: 399, discountPrice: 299, stock: 11, imageURLs: ["https://images.unsplash.com/photo-1725783521817-3f37e54390a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8V29vZGVuJTIwQm9va3NoZWxmfGVufDB8fDB8fHww"] },
      { title: "Metal Storage Cabinet", description: "Industrial style metal storage cabinet with 2 doors.", categoryID: categories[4]._id, features: ["Metal frame", "2 doors", "Gray color"], price: 549, discountPrice: 449, stock: 7, imageURLs: ["https://images.unsplash.com/photo-1715520530023-cc8a1b2044ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWV0YWwlMjBTdG9yYWdlJTIwQ2FiaW5ldHxlbnwwfHwwfHx8MA%3D%3D"] },
      { title: "Corner Storage Unit", description: "Space-saving corner storage unit for tight spaces.", categoryID: categories[4]._id, features: ["Corner design", "White color", "Compact size"], price: 299, discountPrice: 199, stock: 13, imageURLs: ["https://images.pexels.com/photos/32677179/pexels-photo-32677179.jpeg"] },
      
      // Lighting
      { title: "Pendant Light Fixture", description: "Modern pendant light fixture with adjustable height.", categoryID: categories[5]._id, features: ["Adjustable height", "Modern design", "LED compatible"], price: 129, discountPrice: 99, stock: 25, imageURLs: ["https://images.unsplash.com/photo-1764139625591-867c824d7878?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UGVuZGFudCUyMExpZ2h0JTIwRml4dHVyZXxlbnwwfHwwfHx8MA%3D%3D"] },
      { title: "Floor Lamp", description: "Elegant floor lamp with fabric shade.", categoryID: categories[5]._id, features: ["Fabric shade", "Dimming feature", "Beige"], price: 179, discountPrice: 129, stock: 18, imageURLs: ["https://images.unsplash.com/photo-1675767528117-963ce219b52a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Rmxvb3IlMjBMYW1wfGVufDB8fDB8fHww"] },
      { title: "Desk Lamp", description: "Compact desk lamp with LED light.", categoryID: categories[5]._id, features: ["LED light", "Adjustable arm", "Silver color"], price: 89, discountPrice: 69, stock: 30, imageURLs: ["https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RGVzayUyMExhbXB8ZW58MHx8MHx8fDA%3D"] },
    ]);
    console.log("✅ Created 18 products");

    // Update category product counts
    for (let category of categories) {
      const count = await Product.countDocuments({ categoryID: category._id });
      await Category.findByIdAndUpdate(category._id, { productCount: count });
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
