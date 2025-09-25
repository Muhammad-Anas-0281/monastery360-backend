import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import "./passport.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import monasteryRoutes from "./routes/monasteries.js";
import eventRoutes from "./routes/events.js";
import archiveRoutes from "./routes/archives.js";
import proposalRoutes from "./routes/proposals.js";
import triviaRoutes from "./routes/trivia.js";
import chatbotRoutes from "./routes/chatbot.js";
import paymentRoutes from "./routes/payment.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: "monastery360", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/monasteries", monasteryRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/archives", archiveRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/trivia", triviaRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/payment", paymentRoutes);

// DB + Server
connectDB().then((connected) => {
  if (connected) {
    console.log("✅ Database connected successfully");
  } else {
    console.log("⚠️  Running without database - some features may not work");
  }
  
  app.listen(5000, () => {
    console.log("🚀 Server running on port 5000");
    console.log("📡 API Base URL: http://localhost:5000");
    console.log("🔗 Test endpoints:");
    console.log("   GET  http://localhost:5000/api/monasteries");
    console.log("   POST http://localhost:5000/api/auth/register");
    console.log("   POST http://localhost:5000/api/auth/login");
  });
});
