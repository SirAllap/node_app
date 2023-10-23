import { bookingsController } from './controllers/bookings'
import express, { Express } from 'express'
import cors from 'cors'

export const app: Express = express()

// middlewares
app.use(cors())
app.use(express.json())

app.use('/bookings', bookingsController)