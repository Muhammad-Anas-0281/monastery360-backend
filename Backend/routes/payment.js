import express from "express";
import razorpay from "../config/razorpay.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "fallback-secret", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Create payment order
router.post("/create-order", authenticateToken, async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    
    // For trial purposes, create a mock order without Razorpay credentials
    const mockOrder = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * 100, // Amount in paise
      currency,
      status: "created",
      receipt: `receipt_${Date.now()}`,
      created_at: Date.now()
    };

    res.json({ 
      order: mockOrder,
      message: "Mock order created for trial purposes"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Verify payment
router.post("/verify", authenticateToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // For trial purposes, always return success
    // In production, you would verify the signature here
    res.json({ 
      message: "Payment verified successfully (Trial Mode)",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;