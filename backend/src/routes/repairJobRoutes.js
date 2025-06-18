import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';
import repairJobController from '../controllers/repairJobController.js';
import sparePartEntryControllers from '../controllers/sparePartEntryControllers.js';

const router = express.Router();

router.post('/sparepartentries', auth, permit(['admin', 'manager']), sparePartEntryControllers.createSparePartEntry);
router.get('/sparepartentries', auth, permit(['admin', 'manager']), sparePartEntryControllers.getAllSparePartEntries);
router.get('/sparepartentries/:id', auth, permit(['admin', 'manager']), sparePartEntryControllers.getSparePartEntryById);
router.patch('/sparepartentries/:id', auth, permit(['admin', 'manager']), sparePartEntryControllers.updateSparePartEntry);
router.delete('/sparepartentries/:id', auth, permit(['admin', 'manager']), sparePartEntryControllers.deleteSparePartEntry);



router.post('/', auth, permit(["admin", "manager"]), repairJobController.createRepairJob);
router.get('/', auth, permit(["admin", "manager", "technician"]), repairJobController.getAllRepairJobs);
router.get('/search', auth, permit(["admin", "manager", "technician"]), repairJobController.searchRepairJobs);
router.delete('/', auth, permit(["admin"]), repairJobController.deleteRepairJobs);
router.get('/:id', auth, permit(["admin", "manager", "technician"]), repairJobController.getRepairJobById);
router.patch('/:id', auth, permit(["admin", "manager", "technician"]), repairJobController.updateRepairJob);
router.patch('/:id/status', auth, permit(["admin", "manager", "technician"]), repairJobController.updateRepairJobStatus);
router.delete('/:id', auth, permit(["admin"]), repairJobController.deleteRepairJob);

export default router;