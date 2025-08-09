// api/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import NotesRoutes from "../src/routes/NotesRoutes.js";
import { connectDB } from "../src/config/db.js";
import ratelimiter from "../src/middleware/rateLimiter.js";

// Load env vars
dotenv.config();

// Connect to MongoDB (optimized)
connectDB();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

app.use(express.json());
app.use(ratelimiter);

// API routes
app.use("/api/notes", NotesRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

// Export for Vercel
export default app;
