import express from "express";
import sparePartEntryController from "../controllers/sparePartEntryControllers.js";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";

const router = express.Router();

// List all spare part entries
router.get(
  "/",
  auth,
  permit(["admin", "manager", "technician"]),
  sparePartEntryController.getAllSparePartEntries
);

// Create a new spare part entry
router.post(
  "/",
  auth,
  permit(["admin", "manager"]),
  sparePartEntryController.createSparePartEntry
);

// Get a single spare part entry by ID
router.get(
  "/:id",
  auth,
  permit(["admin", "manager", "technician"]),
  sparePartEntryController.getSparePartEntryById
);

// Update a spare part entry
router.patch(
  "/:id",
  auth,
  permit(["admin", "manager"]),
  sparePartEntryController.updateSparePartEntry
);

// Delete a spare part entry
router.delete(
  "/:id",
  auth,
  permit(["admin", "manager"]),
  sparePartEntryController.deleteSparePartEntry
);

export default router;
