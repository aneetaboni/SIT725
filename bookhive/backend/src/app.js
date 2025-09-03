import 'dotenv/config';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/books.js";
import userRoutes from "./routes/users.js";

const app = express();

// DB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.json({ status: "ok", service: "BookHive API" }));
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

export default app;
