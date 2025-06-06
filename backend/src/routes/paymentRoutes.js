import express from 'express'
import paymentController from '../controllers/paymentController.js'
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.post('/', auth, permit(["admin", "manager"]), paymentController.createPayment);
router.get('/', auth, permit(["admin", "manager"]), paymentController.getPayments);
router.get('/:id', auth, permit(["admin", "manager"]), paymentController.getPayment);
router.patch('/:id', auth, permit(["admin", "manager"]), paymentController.updatePayment);
router.delete('/:id', auth, permit(["admin", "manager"]), paymentController.deletePayment);

export default router;