import roomsData from '../data/rooms.json'
import { IRoom } from '../models/room'

export const rooms = roomsData as IRoom[]

async function get() {
	const result = await rooms
	if (!result) throw new Error('Error obtaining all rooms')
	return result
}

async function getById(roomId: number) {
	const id = roomId.toString()
	const result = await rooms.filter((room) => room.id === id)
	if (result.length === 0) throw new Error('Bad request')
	return result
}

async function post(room: IRoom) {
	const currentRoomLenght = rooms.length
	const result = await rooms.push(room)
	if (currentRoomLenght === rooms.length)
		throw new Error('Error posting new room')
	return result
}

async function put(roomId: number, update: Partial<IRoom>) {
	const id = roomId.toString()
	const currentObjectIndex = rooms.findIndex((room) => room.id === id)
	if (currentObjectIndex === -1) throw new Error('Booking not found')
	const result = (rooms[currentObjectIndex] = {
		...rooms[currentObjectIndex],
		...update,
	})
	return result
}

async function _delete(roomId: number) {
	const id = roomId.toString()
	const currentObjectIndex = rooms.findIndex((room) => room.id === id)
	if (currentObjectIndex === -1) throw new Error('Booking not found')
	const result = await rooms.splice(currentObjectIndex, 1)
	return result
}

export const roomService = {
	get,
	getById,
	post,
	put,
	delete: _delete,
}
