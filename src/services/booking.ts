import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'

export const bookings = bookingsData as IBooking[]

async function get() {
	const result = await bookings
	if (!result) throw new Error('Error obtaining all bookings')
	return result
}

async function getById(bookingId: number) {
	const id = bookingId.toString()
	const result = await bookings.filter((booking) => booking.id === id)
	if (result.length === 0) throw new Error('Bad request')
	return result
}

async function post(booking: IBooking) {
	const currentBoookingLength = bookings.length
	const result = await bookings.push(booking)
	if (currentBoookingLength === bookings.length)
		throw new Error('Error posting new booking')
	return result
}

async function put(bookingId: number, update: Partial<IBooking>) {
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

async function _delete(bookingId: number) {
	const id = bookingId.toString()
	const currentObjectIndex = bookings.findIndex(
		(booking) => booking.id === id
	)
	if (currentObjectIndex === -1) throw new Error('Booking not found')
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
