import { IContact } from '../interfaces/contact'
import { ContactModel } from '../models/contact.model'

const fetchAll = async () => {
	const result = await ContactModel.find()
	if (result.length === 0)
		throw new Error('There is no contacts in the database.')
	return result
}

const fetchOne = async (contactId: string) => {
	const result = await ContactModel.findById(contactId)
	if (!result)
		throw new Error('There is no contact with that ID in the database.')
	return result
}

const createOne = async (contact: IContact) => {
	const result = await ContactModel.create(contact)
	return result
}

const updateOne = async (contactId: string, update: Partial<IContact>) => {
	const result = await ContactModel.findByIdAndUpdate(contactId, update, {
		new: true,
	})
	if (!result) {
		throw new Error()
	}
	return result
}

const destroyOne = async (contactId: string) => {
	const result = await ContactModel.findByIdAndDelete(contactId)
	if (!result) {
		throw new Error()
	}
	return result
}

export const contactService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
