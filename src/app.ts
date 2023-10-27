import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { authMiddleware } from './middlewares/auth'
import api_info from './data/api_info.json'
import { authController } from './controllers/auth'
import { bookingsController } from './controllers/booking'
import { roomsController } from './controllers/room'
import { contactsController } from './controllers/contact'
import { usersController } from './controllers/user'

// middlewares & router
export const app: Express = express()
	.use(cors())
	.use(express.json())
	.use(morgan('combined'))
	.use('/api-info', (_req: Request, res: Response) => res.json({ api_info }))
	.use('/login', authController)
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
