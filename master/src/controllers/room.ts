import { Request, Response, Router } from 'express'
import { IRoom } from '../interface/room'
import { roomService } from '../services/room'
import { validateOject } from '../middlewares/validation'
import { roomSchema } from '../validators/schemas'

export const roomsController = Router()

roomsController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await roomService.fetchAll()
		res.json(result)
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

roomsController.get(
	'/:roomId',
	async (req: Request<{ roomId: number }>, res: Response) => {
		try {
			const result = await roomService.fetchOne(req.params.roomId)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

roomsController.post(
	'/',
	validateOject(roomSchema),
	async (req: Request<{}, IRoom>, res: Response) => {
		try {
			const newRoom = { ...req.body }
			await roomService.createOne(newRoom)
			res.json('Room successfully created')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

roomsController.put(
	'/:roomId',
	validateOject(roomSchema),
	async (req: Request<{ roomId: string }, {}, IRoom>, res: Response) => {
		try {
			const id = req.params.roomId
			const roomToUpdate = { ...req.body }
			await roomService.updateOne(id, roomToUpdate),
				res.json('Room successfully updated')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)

roomsController.delete(
	'/:roomId',
	async (req: Request<{ roomId: number }>, res: Response) => {
		try {
			const result = await roomService.destroyOne(req.params.roomId)
			res.json(result)
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)
