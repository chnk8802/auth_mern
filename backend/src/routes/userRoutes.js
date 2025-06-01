import express from "express";
import userControllers from "../controllers/userControllers.js";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";

const router = express.Router();

router.get("/", auth, permit(["admin", "manager"]), userControllers.getUsers);
router.get("/me", auth, userControllers.getCurrentUser);
router.get("/:id", auth, permit(["admin", "manager"]), userControllers.getUser);
router.patch("/:id", auth, permit(["admin"]), userControllers.updateUser);
router.delete("/:id", auth, permit(["admin"]), userControllers.deleteUser);

export default router;
