import express from 'express';
import sparePartController from '../controllers/sparePartController.js';
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.get('/', auth, permit(['admin', 'manager', 'technician']), sparePartController.getSpareParts);
router.post('/', auth, permit(['admin', 'manager']), sparePartController.createSparePart);
router.get('/:id', auth, permit(['admin', 'manager', 'technician']), sparePartController.getSparePart);
router.patch('/:id', auth, permit(['admin', 'manager']), sparePartController.updateSparePart);
router.delete('/:id', auth, permit(['admin', 'manager']), sparePartController.deleteSparePart);

export default router;