import express from "express";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";
import { lookup } from "../controllers/lookupController.js";

const router = express.Router();

router.get("/", auth, permit(["admin", "manager", "technician"]), lookup);

export default router;