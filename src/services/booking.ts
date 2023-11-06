import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'
import { SelectQuery } from '../util/util'

export const bookings = bookingsData as IBooking[]

const fetchAll = async () => {
	const result = await SelectQuery(
		'SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b LEFT JOIN room r ON b.room_id = r.id LEFT JOIN photo p ON r.id = p.room_id GROUP BY b.id, r.room_number, r.room_type;'
	)
	return result
}

const fetchOne = async (bookingId: number) => {
	const result = await SelectQuery(
		`SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b LEFT JOIN room r ON b.room_id = r.id LEFT JOIN photo p ON r.id = p.room_id WHERE b.id = ${bookingId} GROUP BY b.id, r.room_number, r.room_type;`
	)
	return result
}

const createOne = async (booking: IBooking) => {
	const currentBoookingLength = bookings.length
	const result = await bookings.push(booking)
	if (currentBoookingLength === bookings.length)
		throw new Error('Error posting new booking')
	return result
}

const updateOne = async (bookingId: number, update: Partial<IBooking>) => {
	const id = bookingId.toString()
	const currentObjectIndex = bookings.findIndex(
		(booking) => booking.id === id
	)
	if (currentObjectIndex === -1) throw new Error('Booking not found')
	const result = (bookings[currentObjectIndex] = {
		...bookings[currentObjectIndex],
		...update,
	})
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
