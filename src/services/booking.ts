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

async function post(booking: IBooking) {
	const result = await bookings.push(booking)
	return result
}

async function put(bookingId: number, update: Partial<IBooking>) {
	const id = bookingId.toString()
	const currentObjectIndex = bookings.findIndex(
		(booking) => booking.id === id
	)
	const result = (bookings[currentObjectIndex] = {
		...bookings[currentObjectIndex],
		...update,
	})
	return result
}

async function _delete(bookingId: number) {
	const id = bookingId.toString()
	const currentObjectIndex = bookings.findIndex(
		(booking) => booking.id === id
	)
	const result = await bookings.splice(currentObjectIndex, 1)
	return result
}

export const bookingService = {
	get,
	getById,
	post,
	put,
	delete: _delete,
}
