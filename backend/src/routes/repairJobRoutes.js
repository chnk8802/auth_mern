import express from "express";
import auth from "../middlewares/authMiddleware.js";
import permit from "../middlewares/permissionMiddleware.js";
import {
  createRepairJob,
  deleteRepairJobs,
  getAllRepairJobs,
  getRepairJobById,
  searchRepairJobs,
  updateRepairJob,
  updateRepairJobStatus,
} from "../controllers/repairJobController.js";

const router = express.Router();

router.post("/", auth, permit(["admin", "manager"]), createRepairJob);
router.get(
  "/",
  auth,
  permit(["admin", "manager", "technician"]),
  getAllRepairJobs
);
router.get(
  "/search",
  auth,
  permit(["admin", "manager", "technician"]),
  searchRepairJobs
);
router.delete("/", auth, permit(["admin"]), deleteRepairJobs);
router.get(
  "/:id",
  auth,
  permit(["admin", "manager", "technician"]),
  getRepairJobById
);
router.patch(
  "/:id",
  auth,
  permit(["admin", "manager", "technician"]),
  updateRepairJob
);
// router.patch('/:id', auth, permit(["admin", "manager", "technician"]), (rq, rs, nx) => openTransaction({req: rq, res: rs, next: nx }, updateRepairJob));
router.patch(
  "/:id/status",
  auth,
  permit(["admin", "manager", "technician"]),
  updateRepairJobStatus
);
router.delete("/:id", auth, permit(["admin"]), deleteRepairJobs);

export default router;
