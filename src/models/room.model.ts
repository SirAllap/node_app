import { Schema, model } from 'mongoose'
import { IRoom } from '../interfaces/room'

const roomSchema = new Schema<IRoom>({
	room_number: { type: String, required: true },
	room_photo: { type: [String], required: true },
	room_type: { type: String, required: true },
	description: { type: String, required: true },
	amenities_type: { type: String, required: true },
	amenities: {
		type: [{ name: String, description: String }],
		required: true,
	},
	price: { type: Number, required: true },
	offer_price: { type: Boolean, required: true },
	discount: { type: Number, required: true },
	status: { type: String, required: true },
})

export const roomModel = model<IRoom>('rooms', roomSchema)
