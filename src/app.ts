import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authMiddleware from './middlewares/auth'
import { bookingsController } from './controllers/booking'
import { roomsController } from './controllers/room'
import { loginController } from './controllers/login'

// middlewares & router
export const app: Express = express()
	.use(cors())
	.use(express.json())
	.use(morgan('combined'))
	.use('/login', loginController)
	.use(authMiddleware)
	.use('/bookings', bookingsController)
	.use('/rooms', roomsController)
	.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		console.error(err)
		return res
			.status(500)
			.json({ error: true, message: 'Application error' })
	})
