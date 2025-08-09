import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import NotesRoutes from "./routes/NotesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", NotesRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started");
  });
});
