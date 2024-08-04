// config.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { allRoutes } from "../routes/all.routes.js";
import environmentConfig from "./env/environmentConfig.js";
dotenv.config();

const app = express();

const { PORT, MONGO_URI } = environmentConfig;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
allRoutes(app);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default app;
export { PORT };
