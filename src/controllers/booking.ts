import { NextFunction, Request, Response, Router } from 'express'
import { IBooking } from '../interfaces/booking'
import { bookingService } from '../services/booking'

export const bookingsController = Router()

bookingsController.get(
	'/',
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await bookingService.fetchAll()
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

bookingsController.get(
	'/:bookingId',
	async (req: Request<{ bookingId: number }>, res: Response) => {
		try {
			const result = await bookingService.fetchOne(req.params.bookingId)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

bookingsController.get(
	'/ref/:reference_number',
	async (req: Request<{ reference_number: number }>, res: Response) => {
		try {
			const result = await bookingService.fetchOneByRefNumber(
				req.params.reference_number
			)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

bookingsController.post(
	'/',
	async (req: Request<IBooking>, res: Response, next: NextFunction) => {
		try {
			const result = await bookingService.createOne(req.body)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

bookingsController.put(
	'/:bookingId',
	async (
		req: Request<{ bookingId: number }, IBooking>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await bookingService.updateOne(
				req.params.bookingId,
				req.body
			)
			res.json(result)
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
			const result = await bookingService.destroyOne(req.params.bookingId)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
