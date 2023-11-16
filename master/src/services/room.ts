import { IRoom } from '../interfaces/room'
import { RoomModel } from '../models/room.model'

const fetchAll = async () => {
	const result = await RoomModel.find()
	if (result.length === 0)
		throw new Error('There is no rooms in the database.')
	return result
}

const fetchOne = async (roomId: number) => {
	const result = await RoomModel.findById(roomId)
	if (!result)
		throw new Error('There is no room with that ID in the database.')
	return result
}

const createOne = async (room: IRoom) => {
	const result = await RoomModel.create(room)
	return result
}

const updateOne = async (roomId: number, update: Partial<IRoom>) => {
	const result = await RoomModel.findByIdAndUpdate(roomId, update, {
		new: true,
	})
	if (!result) {
		throw new Error()
	}
	return result
}

const destroyOne = async (roomId: number) => {
	const result = await RoomModel.findByIdAndDelete(roomId)
	if (!result) {
		throw new Error()
	}
	return result
}

export const roomService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
