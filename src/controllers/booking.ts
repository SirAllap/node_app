import { Request, Response, Router } from 'express'
import { IBooking } from '../models/booking'
import { bookingService } from '../services/booking'

export const bookingsController = Router()

bookingsController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await bookingService.get()
		res.send(result)
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

bookingsController.get(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const result = await bookingService.getById(req.params.bookingId)
			res.send(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

bookingsController.post('/', async (req: Request<IBooking>, res: Response) => {
	try {
		await bookingService.post(req.body)
		res.status(200).json('Booking successfully created')
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

bookingsController.put(
	'/:bookingId',
	async (req: Request<{ bookingId: number }, IBooking>, res: Response) => {
		try {
			const id = req.params.bookingId
			const bookingToUpdate = req.body
			await bookingService.put(id, bookingToUpdate),
				res.status(200).json('Booking successfully updated')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

bookingsController.delete(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const id = req.params.bookingId
			await bookingService.delete(id)
			res.status(200).json('Booking successfully deleted')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)
