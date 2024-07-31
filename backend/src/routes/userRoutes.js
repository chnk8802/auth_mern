import express from 'express'
import userControllers from '../controllers/userControllers.js'
import auth from '../middlewares/authmiddleware.js'

const router = express.Router()

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.post('/forgot-password', userControllers.forgotPassword)
router.post('/enter-otp', userControllers.enterOtp)
router.post('/reset-password', userControllers.resetPassword)
router.get('/all-users', auth, userControllers.getUsers)
router.get('/:id', auth, userControllers.getUser)
// router.patch('/:id', auth, userControllers.updateUser)
// router.delete('/:id', auth, userControllers.deleteUser)
router.post('/refresh-token', userControllers.refreshToken)
router.post('/logout', userControllers.logout)

export default router