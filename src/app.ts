import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { bookingsController } from './controllers/booking'
import { roomsController } from './controllers/room'
import { loginController } from './controllers/login'

// middlewares & router
export const app: Express = express()
	.use(cors())
	.use(express.json())
	.use(morgan('combined'))
	.use('/bookings', bookingsController)
	.use('/rooms', roomsController)

	.use('/login', loginController)

	.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		console.error(err)
		return res
			.status(500)
			.json({ error: true, message: 'Application error' })
	})
