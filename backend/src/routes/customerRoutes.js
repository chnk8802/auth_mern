import express from "express";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";
import customerControllers from "../controllers/customerControllers.js";

const router = express.Router();
router.post("/", auth, permit(["admin", "manager"]), customerControllers.createCustomer);
router.get("/", auth, permit(["admin", "manager", "technician"]), customerControllers.getCustomers);
router.get("/:id", auth, permit(["admin", "manager"]), customerControllers.getCustomer);
router.patch("/:id", auth, permit(["admin", "manager"]), customerControllers.updateCustomer);
router.delete("/:id", auth, permit(["admin", "manager"]), customerControllers.deleteCustomer);

export default router;
