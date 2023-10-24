import { Request, Response, Router } from 'express'
import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'

export const bookingsController = Router()

bookingsController.get('/', async (req: Request, res: Response) => {
	try {
		const result = await bookingsData
		res.send(result)
	} catch (error) {
		res.status(500).send(`Error obtaining all bookings: ${error}`)
	}
})

bookingsController.get(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const id = req.params.bookingId.toString()
			const result = await bookingsData.filter(
				(booking) => booking.id === id
			)
			res.send(result)
		} catch (error) {
			res.status(500).send(`Error obtaining the booking: ${error}`)
		}
	}
)

bookingsController.post('/', async (req: Request<IBooking>, res: Response) => {
	try {
		const result = await bookingsData.push(req.body)
		res.send(result)
	} catch (error) {
		res.status(500).send(`Error posting new booking: ${error}`)
	}
})

bookingsController.put(
	'/:bookingId',
	async (req: Request<{ bookingId: number }, IBooking>, res: Response) => {
		try {
			const id = req.params.bookingId.toString()
			const currentObjectIndex = bookingsData.findIndex(
				(booking) => booking.id === id
			)
			if (currentObjectIndex !== -1) {
				const result = await (bookingsData[currentObjectIndex] =
					req.body)
				res.send(result)
			} else {
				res.status(404).send('Booking not found')
			}
		} catch (error) {
			res.status(500).send(`Error posting new booking: ${error}`)
		}
	}
)

bookingsController.delete(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const id = req.params.bookingId.toString()
			const currentObjectIndex = bookingsData.findIndex(
				(booking) => booking.id === id
			)
			if (currentObjectIndex !== -1) {
				await bookingsData.splice(currentObjectIndex, 1)
				res.status(200).send('Booking successfully deleted')
			} else {
				res.status(404).send('Booking not found')
			}
		} catch (error) {
			res.status(500).send(`Error deleting the booking: ${error}`)
		}
	}
)
