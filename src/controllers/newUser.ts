import { IUserClient } from '../interfaces/userClient'
import { authService } from '../services/auth'
import { NextFunction, Request, Response, Router } from 'express'

export const newUserController = Router()

newUserController.post(
	'/',
	async (req: Request<IUserClient>, res: Response, next: NextFunction) => {
		try {
			const result = await authService.signup(req.body)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
