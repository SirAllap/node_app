import { NextFunction, Request, Response, Router } from 'express'
import { IUserClient } from '../interfaces/userClient'
import { userClientService } from '../services/userClientService'

export const usersClientController = Router()

usersClientController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await userClientService.fetchAll()
		res.json(result)
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

usersClientController.get(
	'/:userId',
	async (req: Request<{ userId: number }>, res: Response) => {
		try {
			const result = await userClientService.fetchOne(req.params.userId)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

usersClientController.put(
	'/:userId',
	async (
		req: Request<{ userId: number }, IUserClient>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await userClientService.updateOne(
				req.params.userId,
				req.body
			)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

usersClientController.delete(
	'/:userId',
	async (
		req: Request<{ userId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await userClientService.destroyOne(req.params.userId)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
