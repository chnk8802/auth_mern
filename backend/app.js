import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import repairJobRoutes from "./src/routes/repairJobRoutes.js";

import { notFound } from "./src/middlewares/routeNotFound.js";
import {errorHandler } from "./src/middlewares/errorHandler.js";

// .env configuration
dotenv.config();

// Initialize MongoDB Database
connectDB();

// Initailize Express Server
const app = express();

// Use Cookie parser
app.use(cookieParser());

// Handle CORS
app.use(
  cors({
    origin: true, // Allow requests from this origin
    credentials: true, // Allow sending cookies and other credentials
  })
);
// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/repairjobs", repairJobRoutes);


// Handle 404 Not Found
app.use(notFound);
// Handle Errors
app.use(errorHandler);


export default app;
