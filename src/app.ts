import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authMiddleware from './middlewares/auth'
import hotelInfo from './data/hotelInfo.json'
import { loginController } from './controllers/login'
import { bookingsController } from './controllers/booking'
import { roomsController } from './controllers/room'
import { contactsController } from './controllers/contact'
import { usersController } from './controllers/user'

// middlewares & router
export const app: Express = express()
	.use(cors())
	.use(express.json())
	.use(morgan('combined'))
	.use('/api-info', (_req: Request, res: Response) => res.send(hotelInfo))
	.use('/login', loginController)
	.use(authMiddleware)
	.use('/bookings', bookingsController)
	.use('/rooms', roomsController)
	.use('/contacts', contactsController)
	.use('/users', usersController)
	.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		console.error(err)
		return res
			.status(500)
			.json({ error: true, message: 'Application error' })
	})
