import { authService } from '../services/auth'
import { Request, Response, Router } from 'express'
import { validateOject } from '../validators/validation'
import { authSchema } from '../validators/schemas'

export const authController = Router()

authController.post(
	'/',

	validateOject(authSchema),
	async (req: Request<{ user: string; pass: string }>, res: Response) => {
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
