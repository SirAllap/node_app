import { NextFunction, Request, Response, Router } from 'express'
import { IUser } from '../interfaces/user'
import { userService } from '../services/user'

export const usersController = Router()

usersController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await userService.fetchAll()
		res.json(result)
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

usersController.get(
	'/:userId',
	async (req: Request<{ userId: number }>, res: Response) => {
		try {
			const result = await userService.fetchOne(req.params.userId)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

usersController.post(
	'/',
	async (req: Request<IUser>, res: Response, next: NextFunction) => {
		try {
			const result = await userService.createOne(req.body)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

usersController.put(
	'/:userId',
	async (
		req: Request<{ userId: number }, IUser>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await userService.updateOne(
				req.params.userId,
				req.body
			)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)

usersController.delete(
	'/:userId',
	async (
		req: Request<{ userId: number }>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const result = await userService.destroyOne(req.params.userId)
			res.json(result)
		} catch (error) {
			next(error)
		}
	}
)
