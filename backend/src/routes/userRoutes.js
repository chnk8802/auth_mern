import express from 'express'
import userControllers from '../controllers/userControllers.js'


const router = express.Router()

router.get('/', userControllers.test)
router.post('/register', userControllers.register)
router.post('/login', userControllers.login)

export default router