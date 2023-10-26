import { Request, Response, Router } from 'express'
import { IUser } from '../models/user'
import { userService } from '../services/user'

export const usersController = Router()

usersController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await userService.get()
		res.send(result)
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

usersController.get(
	'/:userId',
	async (req: Request<{ userId: number }>, res: Response) => {
		try {
			const result = await userService.getById(req.params.userId)
			res.send(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

usersController.post('/', async (req: Request<IUser>, res: Response) => {
	try {
		await userService.post(req.body)
		res.status(200).json('User successfully created')
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

usersController.put(
	'/:userId',
	async (req: Request<{ userId: number }, IUser>, res: Response) => {
		try {
			const id = req.params.userId
			const userToUpdate = req.body
			await userService.put(id, userToUpdate),
				res.status(200).json('User successfully updated')
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
			await userService.delete(id)
			res.status(200).json('User successfully deleted')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)
