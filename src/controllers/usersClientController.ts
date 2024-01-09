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
	'/:userClientId',
	async (req: Request<{ userClientId: number }>, res: Response) => {
		try {
			const result = await userClientService.fetchOne(
				req.params.userClientId
			)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

usersClientController.put(
	'/:userClientId',
	async (
		req: Request<{ userClientId: number }, IUserClient>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await userClientService.updateOne(
				req.params.userClientId,
				req.body
			)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

usersClientController.delete(
	'/:userClientId',
	async (
		req: Request<{ userClientId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await userClientService.destroyOne(
				req.params.userClientId
			)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
