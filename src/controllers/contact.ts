import { Request, Response, Router } from 'express'
import { IContact } from '../models/contact'
import { contactService } from '../services/contact'

export const contactsController = Router()

contactsController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await contactService.get()
		res.send(result)
	} catch (error) {
		res.status(500).send(`${error}`)
	}
})

contactsController.get(
	'/:contactId',
	async (req: Request<{ contactId: number }>, res: Response) => {
		try {
			const result = await contactService.getById(req.params.contactId)
			res.send(result)
		} catch (error) {
			res.status(500).send(`${error}`)
		}
	}
)

contactsController.post('/', async (req: Request<IContact>, res: Response) => {
	try {
		await contactService.post(req.body)
		res.status(200).send('Contact successfully created')
	} catch (error) {
		res.status(500).send(`${error}`)
	}
})

contactsController.put(
	'/:contactId',
	async (req: Request<{ contactId: number }, IContact>, res: Response) => {
		try {
			const id = req.params.contactId
			const contactToUpdate = req.body
			await contactService.put(id, contactToUpdate),
				res.status(200).send('Contact successfully updated')
		} catch (error) {
			res.status(500).send(`${error}`)
		}
	}
)

contactsController.delete(
	'/:contactId',
	async (req: Request<{ contactId: number }>, res: Response) => {
		try {
			const id = req.params.contactId
			await contactService.delete(id)
			res.status(200).send('Contact successfully deleted')
		} catch (error) {
			res.status(500).send(`${error}`)
		}
	}
)
