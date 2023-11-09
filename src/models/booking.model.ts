import { Schema, model } from 'mongoose'
import { IBooking } from '../interfaces/booking'

const bookingSchema = new Schema<IBooking>({
	booking_id: { type: String, required: true },
	guest: { type: String, required: true },
	phone_number: { type: String, required: true },
	order_date: { type: String, required: true },
	check_in: { type: String, required: true },
	check_out: { type: String, required: true },
	special_request: { type: String, required: true },
	room_type: { type: String, required: true },
	room_number: { type: String, required: true },
	status: { type: String, required: true },
	photos: { type: [String], required: true },
	roomId: { type: String },
})

export const bookingModel = model<IBooking>('bookings', bookingSchema)
