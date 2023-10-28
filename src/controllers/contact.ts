import { NextFunction, Request, Response, Router } from 'express'
import { IContact } from '../models/contact'
import { contactService } from '../services/contact'

export const contactsController = Router()

contactsController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await contactService.fetchAll()
		res.json(result)
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

contactsController.get(
	'/:contactId',
	async (req: Request<{ contactId: number }>, res: Response) => {
		try {
			const result = await contactService.fetchOne(req.params.contactId)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

contactsController.post(
	'/',
	async (req: Request<IContact>, res: Response, next: NextFunction) => {
		try {
			const result = await contactService.createOne(req.body)
			res.json(result)
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
			const result = await contactService.updateOne(
				req.params.contactId,
				req.body
			)
			res.json(result)
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
			const result = await contactService.destroyOne(req.params.contactId)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
