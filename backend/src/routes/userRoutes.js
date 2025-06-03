import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";

const router = express.Router();

router.get("/", auth, permit(["admin"]), userController.getUsers);
router.get("/", auth, permit(["admin"]), userController.getUsers);
router.patch("/", auth, permit(["admin", "manager"]), userController.updateUsers);
router.get("/me", auth, userController.getCurrentUser);
router.get("/:id", auth, permit(["admin"]), userController.getUser);
router.patch("/:id", auth, permit(["admin"]), userController.updateUser);
router.delete("/:id", auth, permit(["admin"]), userController.deleteUser);

export default router;
