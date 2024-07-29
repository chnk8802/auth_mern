import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import { notFound, errorHandler} from './src/middlewares/errorHandler.js'

dotenv.config()
connectDB();
const app = express()

app.use(cors({
    origin: ['http://localhost:5173','http://192.168.1.3:5173'],  // Allow requests from this origin
    credentials: true,  // Allow sending cookies and other credentials
}))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

export default app