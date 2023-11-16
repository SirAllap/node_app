import { Request, Response, Router } from 'express'
import { IUser } from '../interface/user'
import { userService } from '../services/user'
import { validateOject } from '../middlewares/validation'
import { userSchema } from '../validators/schemas'

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
	validateOject(userSchema),
	async (req: Request<{}, IUser>, res: Response) => {
		try {
			const newUser = { ...req.body }
			await userService.createOne(newUser)
			res.json('User successfully created')
		} catch (error) {
			res.status(500).json(`${error}`)
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
	validateOject(userSchema),
	async (req: Request<{ userId: string }, {}, IUser>, res: Response) => {
		try {
			const id = req.params.userId
			const userToUpdate = { ...req.body }
			await userService.updateOne(id, userToUpdate),
				res.json('User successfully updated')
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
