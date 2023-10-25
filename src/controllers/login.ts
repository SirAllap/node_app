import authService from '../services/login'
import { Request, Response, Router } from 'express'

export const loginController = Router()

loginController.post(
	'/',
	async (req: Request<{ user: string; pass: string }>, res: Response) => {
		try {
			const userName = req.body.user
			const password = req.body.pass
			const result = await authService.login(userName, password)
			res.send(result)
		} catch (error) {
			res.status(400).send(`${error}`)
		}
	}
)
