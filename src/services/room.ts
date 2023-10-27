import roomsData from '../data/rooms.json'
import { IRoom } from '../models/room'

export const rooms = roomsData as IRoom[]

const fetchAll = async () => {
	const result = await rooms
	if (!result) throw new Error('Error obtaining all rooms')
	return result
}

const fetchOne = async (roomId: number) => {
	const id = roomId.toString()
	const result = await rooms.filter((room) => room.id === id)
	if (result.length === 0) throw new Error('Bad request')
	return result
}

const createOne = async (room: IRoom) => {
	const currentRoomLenght = rooms.length
	const result = await rooms.push(room)
	if (currentRoomLenght === rooms.length)
		throw new Error('Error posting new room')
	return result
}

const updateOne = async (roomId: number, update: Partial<IRoom>) => {
	const id = roomId.toString()
	const currentObjectIndex = rooms.findIndex((room) => room.id === id)
	if (currentObjectIndex === -1) throw new Error('Booking not found')
	const result = (rooms[currentObjectIndex] = {
		...rooms[currentObjectIndex],
		...update,
	})
	return result
}

const destroyOne = async (roomId: number) => {
	const id = roomId.toString()
	const currentObjectIndex = rooms.findIndex((room) => room.id === id)
	if (currentObjectIndex === -1) throw new Error('Booking not found')
	const result = await rooms.splice(currentObjectIndex, 1)
	return result
}

export const roomService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
