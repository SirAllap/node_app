import { IBooking } from '../models/booking'
import { ModifyQuery, SelectQuery } from '../util/util'

const fetchAll = async () => {
	const query = `
	SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures 
	FROM booking b LEFT JOIN room r ON b.room_id = r.id 
	LEFT JOIN photo p ON r.id = p.room_id 
	GROUP BY b.id, r.room_number, r.room_type;
	`
	const result = await SelectQuery(query)
	return result
}

const fetchOne = async (bookingId: number) => {
	const query = `
	SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures
	FROM booking b
	LEFT JOIN room r ON b.room_id = r.id
	LEFT JOIN photo p ON r.id = p.room_id
	WHERE b.id = ?
	GROUP BY b.id, r.room_number, r.room_type;
	`
	const params = [bookingId]
	const result = await SelectQuery(query, params)
	return result
}

const createOne = async (booking: IBooking) => {
	const query = `
	INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
	VALUES (?, ?, ?, ?, ?, ?, ?, ?);
	`
	const params = [
		booking.guest,
		booking.phone_number,
		booking.order_date,
		booking.check_in,
		booking.check_out,
		booking.special_request,
		booking.status,
		booking.room_id,
	]
	const result = await ModifyQuery(query, params)
	return result
}

const updateOne = async (bookingId: number, update: Partial<IBooking>) => {
	const query = `
	UPDATE booking
	SET guest=?, phone_number=?, order_date=?, check_in=?, check_out=?, special_request=?, status=?, room_id=?
	WHERE id=?;
	`
	const params = [
		update.guest,
		update.phone_number,
		update.order_date,
		update.check_in,
		update.check_out,
		update.special_request,
		update.status,
		update.room_id,
		bookingId,
	]
	const result = await ModifyQuery(query, params)
	return result
}

const destroyOne = async (bookingId: number) => {
	const query = `DELETE FROM booking WHERE id=?;`
	const params = [bookingId]
	const result = await ModifyQuery(query, params)
	return result
}

export const bookingService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
