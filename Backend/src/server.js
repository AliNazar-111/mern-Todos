import express from "express";
import cors from "cors";
import NotesRoutes from "./routes/NotesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

// dotenv.config() is removed as Vercel injects environment variables directly

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(cors());

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", NotesRoutes);

// Removed the section for serving frontend static files
// as Vercel's vercel.json handles this for monorepos.

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
