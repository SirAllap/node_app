import authService from '../services/auth'
import { Request, Response, Router } from 'express'

export const authController = Router()

authController.post(
	'/',
	async (req: Request<{ user: string; pass: string }>, res: Response) => {
		try {
			const userName = req.body.user
			const password = req.body.pass
			const result = await authService.login(userName, password)
			res.json(result)
		} catch (error) {
			res.status(401).json(`${error}`)
		}
	}
)
