import { authService } from '../services/auth'
import { Request, Response, Router } from 'express'

export const authController = Router()

authController.post(
	'/',
	async (
		req: Request<{ email: string; password: string }>,
		res: Response
	) => {
		try {
			const result = await authService.login(
				req.body.email,
				req.body.password
			)
			res.json(result)
		} catch (error) {
			res.status(401).json(`${error}`)
		}
	}
)
