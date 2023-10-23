import { Request, Response, Router } from 'express'
import bookingsData from '../data/bookings.json'

export const bookingsController = Router()

interface IBooking {
	id: string
	guest: string
	phone_number: string
	order_date: string
	check_in: string
	check_out: string
	special_request: string
	room_type: string
	room_number: string
	status: string
	photos: string[]
}

bookingsController.get('/', async (req: Request, res: Response) => {
	try {
		res.send(bookingsData)
	} catch (error) {
		res.status(500).send(`Error obtaining all bookings: ${error}`)
	}
})

bookingsController.get(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const id = req.params.bookingId.toString()
			const data = bookingsData.filter((booking) => booking.id === id)
			res.send(data)
		} catch (error) {
			res.status(500).send(`Error obtaining the booking: ${error}`)
		}
	}
)

bookingsController.post(
	'/',
	async (req: Request<{}, {}, IBooking>, res: Response) => {
		try {
			bookingsData.push(req.body)
			res.send(bookingsData)
		} catch (error) {
			res.status(500).send(`Error posting new booking: ${error}`)
		}
	}
)
