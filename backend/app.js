import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import lookupRoutes from "./src/routes/lookupRoutes.js"
import userRoutes from "./src/routes/userRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import technicianRoutes from "./src/routes/technicianRoutes.js";
import repairJobRoutes from "./src/routes/repairJobRoutes.js";
import sparePartRoutes from "./src/routes/sparePartRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js"

import { notFound } from "./src/middlewares/routeNotFound.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

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
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Allow sending cookies and other credentials
  })
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/lookup", lookupRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/technicians", technicianRoutes);
app.use("/api/repairjobs", repairJobRoutes);
app.use("/api/spareparts", sparePartRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/payments", paymentRoutes);

// Handle 404 Not Found
app.use(notFound);
// Handle Errors
app.use(errorHandler);

export default app;
