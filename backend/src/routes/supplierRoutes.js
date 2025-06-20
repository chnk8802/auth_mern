import express from 'express';
import supplierController from '../controllers/supplierController.js';
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.post('/', auth, permit(['admin']), supplierController.createSupplier);
router.post('/duplicate', auth, permit(["admin"]), supplierController.duplicateSuppliers);
router.get('/', auth, permit(['admin']), supplierController.getSuppliers);
router.get('/:id', auth, permit(['admin']), supplierController.getSupplier);
router.patch('/:id', auth, permit(['admin']), supplierController.updateSupplier);
router.delete("/", auth, permit(["admin", "manager"]), supplierController.deleteSuppliers);
router.delete('/:id', auth, permit(['admin']), supplierController.deleteSupplier);

export default router;
