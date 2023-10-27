import { NextFunction, Request, Response, Router } from 'express'
import { IContact } from '../models/contact'
import { contactService } from '../services/contact'

export const contactsController = Router()

contactsController.get(
	'/',
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await contactService.fetchAll()
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

contactsController.get(
	'/:contactId',
	async (
		req: Request<{ contactId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await contactService.fetchOne(req.params.contactId)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

contactsController.post(
	'/',
	async (req: Request<IContact>, res: Response, next: NextFunction) => {
		try {
			await contactService.createOne(req.body)
			res.json(req.body)
		} catch (error) {
			next(error)
		}
	}
)

contactsController.put(
	'/:contactId',
	async (
		req: Request<{ contactId: number }, IContact>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.contactId
			const contactToUpdate = req.body
			await contactService.updateOne(id, contactToUpdate)
			res.json('Contact successfully updated')
		} catch (error) {
			next(error)
		}
	}
)

contactsController.delete(
	'/:contactId',
	async (
		req: Request<{ contactId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.contactId
			await contactService.destroyOne(id)
			res.json('Contact successfully deleted')
		} catch (error) {
			next(error)
		}
	}
)
