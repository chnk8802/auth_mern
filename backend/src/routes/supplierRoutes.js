import express from 'express';
import supplierController from '../controllers/supplierController.js';
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.post('/', auth, permit(['admin']), supplierController.createSupplier);
router.get('/', auth, permit(['admin']), supplierController.getSuppliers);
router.get('/:id', auth, permit(['admin']), supplierController.getSupplier);
router.patch('/:id', auth, permit(['admin']), supplierController.updateSupplier);
router.delete('/:id', auth, permit(['admin']), supplierController.deleteSupplier);

export default router;
