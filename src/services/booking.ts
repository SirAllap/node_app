import { IBooking } from '../interfaces/booking'
import { BookingModel } from '../models/booking.model'

const fetchAll = async () => {
	const result = await BookingModel.find()
	if (result.length === 0)
		throw new Error('There is no bookings in the database.')
	return result
}

const fetchOne = async (bookingId: number) => {
	const result = await BookingModel.findById(bookingId)
	if (!result)
		throw new Error('There is no booking with that ID in the database.')
	return result
}

const fetchOneByRefNumber = async (reference_number: number) => {
	const result = await BookingModel.findOne({
		reference_number: reference_number,
	})
	if (!result)
		throw new Error(
			'There is no booking with that reference number in the database.'
		)
	return result
}

const createOne = async (booking: IBooking) => {
	const result = await BookingModel.create(booking)
	return result
}

const updateOne = async (bookingId: number, update: Partial<IBooking>) => {
	const result = await BookingModel.findByIdAndUpdate(bookingId, update, {
		new: true,
	})
	if (!result) {
		throw new Error()
	}
	return result
}

const destroyOne = async (bookingId: number) => {
	const result = await BookingModel.findByIdAndDelete(bookingId)
	if (!result) {
		throw new Error()
	}
	return result
}

export const bookingService = {
	fetchAll,
	fetchOne,
	fetchOneByRefNumber,
	createOne,
	updateOne,
	destroyOne,
}
