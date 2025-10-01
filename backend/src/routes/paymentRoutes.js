import express from 'express'
import { createPayment, getAllPayments, reversePayment, deletePayment} from '../controllers/paymentController.js'
import auth from '../middlewares/authMiddleware.js';
import permit from '../middlewares/permissionMiddleware.js';

const router = express.Router();

router.post('/', auth, permit(["admin", "manager"]), createPayment);
router.get('/', auth, permit(["admin", "manager"]), getAllPayments);
router.delete('/',auth,permit(["admin"]),deletePayment);
router.post('/reverse', auth, permit(["admin", "manager"]), reversePayment);


export default router;