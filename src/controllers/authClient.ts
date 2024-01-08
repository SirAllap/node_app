import { authService } from '../services/auth'
import { Request, Response, Router } from 'express'

export const authClientController = Router()

authClientController.post(
	'/',
	async (
		req: Request<{ email: string; password: string }>,
		res: Response
	) => {
		try {
			const result = await authService.loginClient(
				req.body.email,
				req.body.password
			)
			res.json(result)
		} catch (error) {
			res.status(401).json(`${error}`)
		}
	}
)
