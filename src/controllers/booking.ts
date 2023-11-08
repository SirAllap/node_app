import { NextFunction, Request, Response, Router } from 'express'
import { IBooking } from '../interface/booking'
import { bookingService } from '../services/booking'
import { validateOject } from '../validators/validation'
import { bookingSchema } from '../validators/schemas'

export const bookingsController = Router()

bookingsController.get(
	'/',
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await bookingService.fetchAll()
			res.json({ result })
		} catch (error) {
			next(error)
		}
	}
)

bookingsController.get(
	'/:bookingId',
	async (
		req: Request<{ bookingId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await bookingService.fetchOne(req.params.bookingId)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

bookingsController.post(
	'/',
	validateOject(bookingSchema),
	async (req: Request<{}, IBooking>, res: Response, next: NextFunction) => {
		try {
			const newBooking = { ...req.body }
			await bookingService.createOne(newBooking)
			res.json({ message: 'Booking successfully created' })
		} catch (error) {
			next(error)
		}
	}
)

bookingsController.put(
	'/:bookingId',
	validateOject(bookingSchema),
	async (
		req: Request<{ bookingId: string }, {}, IBooking>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.bookingId
			const bookingToUpdate = { ...req.body }
			await bookingService.updateOne(id, bookingToUpdate),
				res.json({ message: 'Booking successfully updated' })
		} catch (error) {
			next(error)
		}
	}
)

bookingsController.delete(
	'/:bookingId',
	async (
		req: Request<{ bookingId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.bookingId
			await bookingService.destroyOne(id)
			res.json({ message: 'Booking successfully deleted' })
		} catch (error) {
			next(error)
		}
	}
)
