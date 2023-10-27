import { Request, Response, Router } from 'express'
import { IRoom } from '../models/room'
import { roomService } from '../services/room'

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

roomsController.post('/', async (req: Request<IRoom>, res: Response) => {
	try {
		await roomService.createOne(req.body)
		res.json('Room successfully created')
	} catch (error) {
		res.status(500).json(`${error}`)
	}
})

roomsController.put(
	'/:roomId',
	async (req: Request<{ roomId: number }, IRoom>, res: Response) => {
		try {
			const id = req.params.roomId
			const roomToUpdate = req.body
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
			const id = req.params.roomId
			await roomService.destroyOne(id)
			res.json('Room successfully deleted')
		} catch (error) {
			res.status(500).json(`${error}`)
		}
	}
)
