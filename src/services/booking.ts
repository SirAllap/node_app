// import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'
import { SelectQuery } from '../util/util'

// export const bookings = bookingsData as IBooking[]

const fetchAll = async () => {
	const result = await SelectQuery(
		'SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b LEFT JOIN room r ON b.room_id = r.id LEFT JOIN photo p ON r.id = p.room_id GROUP BY b.id, r.room_number, r.room_type;'
	)
	return result
}

const fetchOne = async (bookingId: number) => {
	const query = `SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures
                 FROM booking b
                 LEFT JOIN room r ON b.room_id = r.id
                 LEFT JOIN photo p ON r.id = p.room_id
                 WHERE b.id = ${bookingId}
                 GROUP BY b.id, r.room_number, r.room_type;`

	const result = await SelectQuery(query)
	return result
}

const createOne = async (booking: IBooking) => {
	const query = `
	INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
	VALUES ('${booking.guest}', '${booking.phone_number}', '${booking.order_date}', '${booking.check_in}', '${booking.check_out}', '${booking.special_request}', '${booking.status}', ${booking.room_id});
	`
	const result = await SelectQuery(query)
	return result
}

const updateOne = async (bookingId: number, update: Partial<IBooking>) => {
	const query = `
	UPDATE booking
	SET guest='${update.guest}', phone_number='${update.phone_number}', order_date='${update.order_date}', check_in='${update.check_in}', check_out='${update.check_out}', special_request='${update.special_request}', status='${update.status}', room_id=${update.room_id}
	WHERE id = ${bookingId};
	`
	const result = await SelectQuery(query)
	return result
}

const destroyOne = async (bookingId: number) => {
	const result = await SelectQuery(
		`DELETE FROM booking WHERE id = ${bookingId};`
	)
	return result
}

export const bookingService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
