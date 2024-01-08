import { Schema, model } from 'mongoose'
import { IUserClient } from '../interfaces/userClient'

const userClientSchema = new Schema<IUserClient>({
	full_name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	photo: { type: String, required: false },
	phone_number: { type: String, required: true },
})

export const UserClientModel = model<IUserClient>('users', userClientSchema)
