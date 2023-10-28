import { Schema, model } from 'mongoose'
import { IUser } from './user'

const userSchema = new Schema<IUser>({
	full_name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	photo: { type: String, required: true },
	start_date: { type: String, required: true },
	description: { type: String, required: true },
	phone_number: { type: String, required: true },
	status: { type: String, required: true },
})

export const userModel = model<IUser>('users', userSchema)
