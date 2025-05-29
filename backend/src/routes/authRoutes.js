import express from 'express'
import authControllers from '../controllers/authControllers.js'
import auth from '../middlewares/authmiddleware.js'

const router = express.Router()

router.post('/register', authControllers.register)
router.post('/refresh-token', authControllers.refreshToken)
router.post('/login', authControllers.login)
router.post('/logout', auth, authControllers.logout)
router.post('/forgot-password', authControllers.forgotPassword)
router.post('/enter-otp', authControllers.enterOtp)
router.post('/reset-password', authControllers.resetPassword)

export default router