import { Request, Response, Router } from 'express'
import api_info from '../data/api_info.json'

export const infoController = Router()
infoController.get('/', async (_req: Request, res: Response) => {
	try {
		await res.json(api_info)
	} catch (error) {
		res.status(400).json('Error obtaining the info.')
	}
})
