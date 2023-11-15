import express, { Express, Request, Response, NextFunction } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import { authMiddleware } from './middlewares/auth'
import api_info from './data/api_info.json'
import { authController } from './controllers/auth'
import { bookingsController } from './controllers/booking'
import { roomsController } from './controllers/room'
import { contactsController } from './controllers/contact'
import { usersController } from './controllers/user'

// connect to DB
;(async () => {
	// const URI_LOCAL: string = process.env.MONGO_URI || ''
	const URI_ATLAS: string = process.env.MONGO_ATLAS_URI || ''
	try {
		await connect(URI_ATLAS, {
			dbName: process.env.MONGO_DB || 'Dashboard-api',
		})
		console.log('Connected to MongoDB')
	} catch (err) {
		throw new Error(`Error connecting to MongoDB: ${err}`)
	}
})()

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
