import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import NotesRoutes from "./routes/NotesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Only enable CORS for development if needed, or configure it for specific origins in production
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Your frontend development URL
    })
  );
} else {
  // For production, you might want to restrict CORS to your deployed frontend URL
  // app.use(cors({ origin: "https://your-frontend-url.vercel.app" }));
  // Or remove if Vercel handles it via proxy/rewrites
}

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", NotesRoutes);

// Removed the static file serving block for frontend, as frontend is deployed separately.
// If you intend for this backend to also serve the frontend, this block would be re-added
// and vercel.json would need a different configuration for a monorepo setup.

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
