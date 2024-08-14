import express from "express";
import customerController from "../controllers/customerControllers.js";
import auth from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/add-customer", auth, customerController.addCustomer);
router.get("/all-customers", auth, customerController.getAllCustomers);
router.get("/:id", auth, customerController.getCustomer);
router.patch("/:id", auth, customerController.updateCustomer);
router.delete("/:id", auth, customerController.deleteCustomer);

export default router;
