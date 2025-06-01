import express from 'express';
import repairJobControllers from '../controllers/repairJobControllers.js';
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();
router.post('/', auth, permit(["admin", "manager"]), repairJobControllers.createRepairJob);
router.get('/', auth, permit(["admin", "manager"]), repairJobControllers.getRepairJobs);
router.get('/:id', auth, permit(["admin", "manager"]), repairJobControllers.getRepairJob);
router.patch('/:id', auth, permit(["admin", "manager"]), repairJobControllers.updateRepairJob);
router.patch('/:id/status', auth, permit(["admin", "manager"]), repairJobControllers.updateRepairJobstatus);
router.delete('/:id', auth, permit(["admin", "manager"]), repairJobControllers.deleteRepairJob);
export default router;