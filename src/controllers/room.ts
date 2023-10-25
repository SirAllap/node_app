import { Request, Response, Router } from 'express'
import { IRoom } from '../models/room'
import { roomService } from '../services/room'

export const roomsController = Router()

roomsController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await roomService.get()
		res.send(result)
	} catch (error) {
		res.status(500).send(`${error}`)
	}
})

roomsController.get(
	'/:roomId',
	async (req: Request<{ roomId: number }>, res: Response) => {
		try {
			const result = await roomService.getById(req.params.roomId)
			res.send(result)
		} catch (error) {
			res.status(500).send(`${error}`)
		}
	}
)

roomsController.post('/', async (req: Request<IRoom>, res: Response) => {
	try {
		await roomService.post(req.body)
		res.status(200).send('Room successfully created')
	} catch (error) {
		res.status(500).send(`${error}`)
	}
})

roomsController.put(
	'/:roomId',
	async (req: Request<{ roomId: number }, IRoom>, res: Response) => {
		try {
			const id = req.params.roomId
			const roomToUpdate = req.body
			await roomService.put(id, roomToUpdate),
				res.status(200).send('Room successfully updated')
		} catch (error) {
			res.status(500).send(`${error}`)
		}
	}
)

roomsController.delete(
	'/:roomId',
	async (req: Request<{ roomId: number }>, res: Response) => {
		try {
			const id = req.params.roomId
			await roomService.delete(id)
			res.status(200).send('Room successfully deleted')
		} catch (error) {
			res.status(500).send(`${error}`)
		}
	}
)
