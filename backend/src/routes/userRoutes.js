import express from 'express'
import userControllers from '../controllers/userControllers.js'
import auth from '../middlewares/authmiddleware.js'

const router = express.Router()

router.post('/register', userControllers.register)
router.post('/login', userControllers.login)
router.get('/:id', auth, userControllers.getUser)

export default router