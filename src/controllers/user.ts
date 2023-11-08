import { Request, Response, Router } from 'express'
import { IUser } from '../interface/user'
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

usersController.post('/', async (req: Request<IUser>, res: Response) => {
	try {
		const newUser = { ...req.body }
		await userService.createOne(newUser)
		res.json('User successfully created')
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

usersController.put(
	'/:userId',
	async (req: Request<{ userId: number }, IUser>, res: Response) => {
		try {
			const id = req.params.userId
			const userToUpdate = { ...req.body }
			await userService.updateOne(id, userToUpdate),
				res.json('User successfully updated')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

usersController.delete(
	'/:userId',
	async (req: Request<{ userId: number }>, res: Response) => {
		try {
			const id = req.params.userId
			await userService.destroyOne(id)
			res.json('User successfully deleted')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)
