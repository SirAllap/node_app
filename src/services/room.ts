import roomsData from '../data/rooms.json'
import { IRoom } from '../models/room'
import { SelectQuery } from '../util/util'

export const rooms = roomsData as IRoom[]

const fetchAll = async () => {
	const result = await SelectQuery(
		'SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities FROM room r LEFT JOIN photo p ON r.id = p.room_id LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id LEFT JOIN amenity a ON ahr.amenity_id = a.id GROUP BY r.id;'
	)
	return result
}

const fetchOne = async (roomId: number) => {
	const result = await SelectQuery(
		`SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities FROM room r LEFT JOIN photo p ON r.id = p.room_id LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id LEFT JOIN amenity a ON ahr.amenity_id = a.id WHERE r.id = ${roomId} GROUP BY r.id;`
	)
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
	const result = await SelectQuery(`DELETE FROM room WHERE id = ${roomId};`)
	return result
}

export const roomService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
