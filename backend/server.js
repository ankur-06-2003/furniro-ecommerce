import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import register from "./src/config/prometheus.js";
import { metricsMiddleware } from "./src/middlewares/metrics.js";

import authRoutes from "./src/routes/auth.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import messageRoutes from "./src/routes/message.routes.js";

dotenv.config();

const server = express();

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL || "http://localhost:3000",
      "http://localhost:8000",
      
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400,
};

// Middlewares
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(metricsMiddleware);

// Prometheus metrics endpoint
server.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// DB Connection
connectDB();

// Routes
server.use("/api/auth", authRoutes);
server.use("/api/categories", categoryRoutes);
server.use("/api/products", productRoutes);
server.use("/api/cart", cartRoutes);
server.use("/api/orders", orderRoutes);
server.use("/api/messages", messageRoutes);

// Error middleware
server.use((err, _, res, __) => {
  console.log(err.message);

  return res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
