import { Request, Response, Router } from 'express'
import { IRoom } from '../models/room'
import { roomService } from '../services/room'

export const roomsController = Router()

roomsController.get('/', async (_req: Request, res: Response) => {
	try {
		const result = await roomService.get()
		res.send(result)
	} catch (error) {
		res.status(500).send(`Error obtaining all rooms: ${error}`)
	}
})

roomsController.get(
	'/:roomId',
	async (req: Request<{ roomId: number }>, res: Response) => {
		try {
			const result = await roomService.getById(req.params.roomId)
			if (result.length !== 0) {
				res.send(result)
			} else {
				res.status(500).send('The result is empty')
			}
		} catch (error) {
			res.status(500).send(`Error obtaining the roonm: ${error}`)
		}
	}
)

roomsController.post('/', async (req: Request<IRoom>, res: Response) => {
	try {
		await roomService.post(req.body)
		res.status(200).send('Room successfully created')
	} catch (error) {
		res.status(500).send(`Error posting new room: ${error}`)
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
			res.status(500).send(`Room not found: ${error}`)
		}
	}
)

roomsController.delete(
	'/:roomId',
	async (req: Request<{ roomId: number }>, res: Response) => {
		try {
			const id = req.params.roomId
			const result = await roomService.delete(id)
			if (result.some((room: IRoom) => room.id.includes(id.toString()))) {
				res.status(200).send('Room successfully deleted')
			} else {
				res.status(500).send('Room not found')
			}
		} catch (error) {
			res.status(500).send(`Room not found: ${error}`)
		}
	}
)
