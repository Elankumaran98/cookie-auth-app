import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import config from "./config/config.js";
import verifyToken from "./middleware/authenticate.js";
import rateLimiter from "./middleware/rateLimiter.js";
import sanitizeInput from "./middleware/sanitizeInput.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.clientUrl, // Your React app URL
    credentials: true, // Allow credentials (cookies) to be sent and received
  })
);
app.use(helmet()); // Enhance security with HTTP headers
app.use(express.json()); // Parse JSON bodies
app.use(sanitizeInput); // Prevent XSS & SQL injection attacks
app.use(cookieParser()); // Parse cookies
app.use(rateLimiter); // Rate limiting middleware
app.use(morgan("dev")); // Log HTTP requests

// Database connection
mongoose
  .connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });

// Routes
app.use("/api", authRoutes);
app.use("/api/users", verifyToken, userRoutes);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`🚀 App is running on port ${config.port}`);
});
