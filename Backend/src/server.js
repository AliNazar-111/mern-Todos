import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import NotesRoutes from "./routes/NotesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(__dirname, "../Frontend/dist");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(ratelimiter);

app.use("/api/notes", NotesRoutes);
app.use(express.static(path.join));
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server started");
  });
});
