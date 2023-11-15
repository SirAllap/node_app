import { NextFunction, Request, Response, Router } from 'express'
import { IContact } from '../interface/contact'
import { contactService } from '../services/contact'
import { validateOject } from '../middlewares/validation'
import { contactSchema } from '../validators/schemas'

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
	async (req: Request<{ contactId: string }>, res: Response) => {
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
	validateOject(contactSchema),
	async (req: Request<{}, IContact>, res: Response, next: NextFunction) => {
		try {
			const newContact = { ...req.body }
			await contactService.createOne(newContact)
			res.json(req.body)
		} catch (error) {
			next(error)
		}
	}
)

contactsController.put(
	'/:contactId',
	validateOject(contactSchema),
	async (
		req: Request<{ contactId: string }, Partial<IContact>>,

		res: Response,
		next: NextFunction
	) => {
		try {
			const id = req.params.contactId
			const contactToUpdate = { ...req.body }
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
		req: Request<{ contactId: string }>,
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
