import { Schema, model } from 'mongoose'
import { IContact } from '../interfaces/contact'

const contacSchema = new Schema<IContact>({
	full_name: { type: String, required: true },
	email: { type: String, required: true },
	phone_number: { type: String, required: true },
	subject_of_review: { type: String, required: true },
	review_body: { type: String, required: true },
	date: { type: String, required: true },
	dateTime: { type: String, required: true },
	isArchived: { type: String, required: true },
})

export const ContactModel = model<IContact>('contacts', contacSchema)
