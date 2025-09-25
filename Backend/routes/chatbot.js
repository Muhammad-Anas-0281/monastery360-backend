import express from "express";
import { chatWithGemini, runAgent } from "../controllers/chatbotController.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

// Chatbot (multilingual, monasteries in Sikkim)
router.post("/chat", chatWithGemini);

// Agentic AI (site automation - requires auth for booking/payment)
router.post("/agent", verifyJWT, runAgent);

export default router;
