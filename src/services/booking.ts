import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'

export const bookings = bookingsData as IBooking[]

async function get() {
	const result = await bookings
	return result
}

async function getById(bookingId: number) {
	const id = bookingId.toString()
	const result = await bookings.filter((booking) => booking.id === id)
	return result
}

// async function post(booking: IBooking) {
// 	// Save a booking to json file
// }

// async function put(bookingId: number, update: Partial<IBooking>) {
// 	// Update a booking by id and save to json file
// }

// async function _delete(bookingId: number) {
// 	// Delete a booking by id from json file
// }

export const bookingService = {
	get,
	getById,
	// post,
	// put,
	// delete: _delete,
}
