import express from "express";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";
import customerController from "../controllers/customerController.js";

const router = express.Router();
router.post("/", auth, permit(["admin", "manager"]), customerController.createCustomer);
router.post("/duplicate", auth, permit(["admin", "manager"]), customerController.duplicateCustomers);
router.get("/", auth, permit(["admin", "manager", "technician"]), customerController.getCustomers);
router.get("/:id", auth, permit(["admin", "manager"]), customerController.getCustomer);
router.patch("/:id", auth, permit(["admin", "manager"]), customerController.updateCustomer);
router.delete("/", auth, permit(["admin", "manager"]), customerController.deleteCustomers);
router.delete("/:id", auth, permit(["admin", "manager"]), customerController.deleteCustomer);

export default router;
