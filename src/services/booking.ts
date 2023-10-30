import { IBooking } from '../interfaces/booking'
import { bookingModel } from '../models/booking.model'

const fetchAll = async () => {
	const result = await bookingModel.find()
	if (result.length === 0)
		throw new Error('There is no bookings in the database.')
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
	await bookingModel.findByIdAndUpdate(bookingId, update)
	const result = await bookingModel.findById(bookingId)
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
