import { bookingsController } from './controllers/booking'
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { roomsController } from './controllers/room'

export const app: Express = express()

// middlewares
app.use(cors())
app.use(express.json())

app.use('/bookings', bookingsController)
app.use('/rooms', roomsController)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err)
	return res.status(500).json({ error: true, message: 'Application error' })
})
