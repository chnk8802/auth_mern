import express from "express";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";
import lookupController from "../controllers/lookupController.js";

const router = express.Router();

router.get("/dsa/:module/:id", auth, permit(["admin", "manager", "technician"]), lookupController.getLookupData);

export default router;