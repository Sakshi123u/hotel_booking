import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();

app.use(cors());

// middleware
app.use(clerkMiddleware());
app.use(express.json()); // ✅ for all other routes

// ✅ Use express.raw() only for the Clerk webhook route
app.post("/api/clerk", express.raw({ type: "*/*" }), clerkWebhooks);

app.get('/', (req, res) => res.send("API is working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
