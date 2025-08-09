import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // Required for __dirname in ES Modules
import NotesRoutes from "./routes/NotesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ES Modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration (can be more specific in production if needed)
// For a monorepo on Vercel, requests from frontend to backend are typically same-origin,
// so explicit CORS headers might not be strictly necessary for API calls,
// but it's good practice to have it if you anticipate cross-origin requests.
app.use(cors());

app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", NotesRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  // Path to the frontend's dist folder relative to the backend's server.js
  // __dirname is Backend/src, so we go up two levels to the root, then into Frontend/dist
  const frontendPath = path.join(__dirname, "../../Frontend/dist");
  app.use(express.static(frontendPath));

  // For any other route, serve the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
