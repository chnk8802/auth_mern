import express from 'express'
import technicianControllers from "../controllers/technicianControllers.js";
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.get("/", auth, permit(["admin", "manager"]), technicianControllers.getTechnicians);

export default router;