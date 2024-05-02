import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import _middlewares from './src/middlewares/errorHandler.js'

dotenv.config()
connectDB();
const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


app.use(_middlewares.notFound)
app.use(_middlewares.errorHandler)

export default app