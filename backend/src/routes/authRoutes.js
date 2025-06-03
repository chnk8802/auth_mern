import express from 'express'
import authController from '../controllers/authController.js'
import auth from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', authController.register)
router.post('/refresh-token', authController.refreshToken)
router.post('/login', authController.login)
router.post('/logout', auth, authController.logout)
router.post('/forgot-password', authController.forgotPassword)
router.post('/enter-otp', authController.enterOtp)
router.post('/reset-password', authController.resetPassword)

export default router