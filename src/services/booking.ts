import bookingsData from '../data/bookings.json'
import { IBooking } from '../models/booking'
import { bookingModel } from '../models/booking.model'

export const bookings = bookingsData as IBooking[]

const fetchAll = async () => {
	const result = await bookingModel.find()
	return result
}

const fetchOne = async (bookingId: number) => {
	const result = await bookingModel.findById(bookingId)
	if (!result)
		throw new Error('There is no booking with that ID in the database.')
	return result
}

const createOne = async (booking: IBooking) => {
	const result = await bookingModel.create(booking)
	return result
}

const updateOne = async (bookingId: number, update: Partial<IBooking>) => {
	const result = await bookingModel.findByIdAndUpdate(bookingId, update)
	return result
}

const destroyOne = async (bookingId: number) => {
	const result = await bookingModel.findByIdAndDelete(bookingId)
	return result
}

export const bookingService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
