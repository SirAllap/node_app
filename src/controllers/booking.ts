import { Request, Response, Router } from 'express'
import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'
import { bookingService } from '../services/booking'

export const bookingsController = Router()

export const bookings = bookingsData as IBooking[]

bookingsController.get('/', async (req: Request, res: Response) => {
	try {
		const result = await bookingService.get()
		res.send(result)
	} catch (error) {
		res.status(500).send(`Error obtaining all bookings: ${error}`)
	}
})

bookingsController.get(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const result = await bookingService.getById(req.params.bookingId)
			if (result.length !== 0) {
				res.send(result)
			} else {
				res.status(500).send('The result is empty')
			}
		} catch (error) {
			res.status(500).send(`Error obtaining the booking: ${error}`)
		}
	}
)

bookingsController.post('/', async (req: Request<IBooking>, res: Response) => {
	try {
		const result = await bookingService.post(req.body)
		res.status(200).send('Booking successfully created')
	} catch (error) {
		res.status(500).send(`Error posting new booking: ${error}`)
	}
})

bookingsController.put(
	'/:bookingId',
	async (req: Request<{ bookingId: number }, IBooking>, res: Response) => {
		try {
			const id = req.params.bookingId
			const bookingToUpdate = req.body
			await bookingService.put(id, bookingToUpdate),
				res.status(200).send('Booking successfully updated')
		} catch (error) {
			res.status(500).send(`Booking not found: ${error}`)
		}
	}
)

bookingsController.delete(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const id = req.params.bookingId
			const result = await bookingService.delete(id)
			if (result.some((b) => b.id.includes(id.toString()))) {
				res.status(200).send('Booking successfully deleted')
			} else {
				res.status(500).send('Booking not found')
			}
		} catch (error) {
			res.status(500).send(`Booking not found: ${error}`)
		}
	}
)
