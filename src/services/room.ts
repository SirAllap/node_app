import { IRoom } from '../interface/room'
import { modifyQuery, selectQuery } from '../util/util'

const fetchAll = async () => {
	const query = `
	SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities
	FROM room r LEFT JOIN photo p ON r.id = p.room_id
	LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id
	LEFT JOIN amenity a ON ahr.amenity_id = a.id
	GROUP BY r.id;
	`
	const result = await selectQuery(query)
	return result
}

const fetchOne = async (roomId: number) => {
	const query = `
	SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities
	FROM room r
	LEFT JOIN photo p ON r.id = p.room_id
	LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id
	LEFT JOIN amenity a ON ahr.amenity_id = a.id WHERE r.id=?
	GROUP BY r.id;
	`
	const params = [roomId]
	const result = await selectQuery(query, params)
	return result
}

const createOne = async (room: IRoom) => {
	const query = `
	INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status)
	VALUES (?, ?, ?, ?, ?, ?, ?);
	`
	const params = [
		room.room_number,
		room.room_type,
		room.description,
		room.price,
		room.offer_price,
		room.discount,
		room.status,
	]
	const result = await modifyQuery(query, params)
	console.log(result)
	if (result.affectedRows === 0) throw new Error('Nothing has been created')
	const createdRoom = await fetchOne(result.insertId)
	return createdRoom
}

const updateOne = async (roomId: string, update: Partial<IRoom>) => {
	const query = `
	UPDATE room
	SET room_number=?, room_type=?, description=?, price=?, offer_price=?, discount=?, status=?
	WHERE id=?;
	`
	const params = [
		update.room_number,
		update.room_type,
		update.description,
		update.price,
		update.offer_price,
		update.discount,
		update.status,
		roomId,
	]
	const result = await modifyQuery(query, params)
	return result
}

const destroyOne = async (roomId: number) => {
	const query = `
	DELETE FROM room WHERE id=?;
	`
	const params = [roomId]
	const result = await selectQuery(query, params)
	return result
}

export const roomService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
