import express, { Express, Request, Response, NextFunction } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import { authMiddleware } from './middlewares/auth'
import { authController } from './controllers/auth'
import { bookingsController } from './controllers/booking'
import { roomsController } from './controllers/room'
import { contactsController } from './controllers/contact'
import { usersController } from './controllers/user'
import { infoController } from './controllers/infoController'
import { usersClientController } from './controllers/usersClientController'

// connect to DB
;(async () => {
	const URI: string = process.env.MONGO_URI || ''
	const DBNAME: string = process.env.MONGO_DB || 'Dashboard-api'
	try {
		await connect(URI, {
			dbName: DBNAME,
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
	.use('/', infoController)
	.use('/login', authController)
	.use('/signup', authController)
	.use(authMiddleware)
	.use('/bookings', bookingsController)
	.use('/rooms', roomsController)
	.use('/contacts', contactsController)
	.use('/users', usersController)
	.use('/usersClient', usersClientController)
	.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
		console.error(err)
		return res
			.status(500)
			.json({ error: true, message: 'Application error' })
	})
