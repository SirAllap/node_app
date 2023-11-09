import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'
import { IBooking } from '../interface/booking'
import { IRoom } from '../interface/room'
import { IUser } from '../interface/user'
import { IContact } from '../interface/contact'

export const validateOject = (
	schema: ObjectSchema<IBooking | IRoom | IUser | IContact>
) => {
	const validateMiddleware = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { error } = schema.validate(req.body, { abortEarly: false })
		if (error) {
			res.status(400).json({ error: true, message: error.message })
		}
		next()
	}
	return validateMiddleware
}
