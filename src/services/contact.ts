import { IContact } from '../interfaces/contact'
import { contactModel } from '../models/contact.model'

const fetchAll = async () => {
	const result = await contactModel.find()
	if (result.length === 0)
		throw new Error('There is no contacts in the database.')
	return result
}

const fetchOne = async (contactId: number) => {
	const result = await contactModel.findById(contactId)
	if (!result)
		throw new Error('There is no contact with that ID in the database.')
	return result
}

const createOne = async (contact: IContact) => {
	const result = await contactModel.create(contact)
	return result
}

const updateOne = async (contactId: number, update: Partial<IContact>) => {
	const result = await contactModel.findByIdAndUpdate(contactId, update, {
		new: true,
	})
	if (!result) {
		throw new Error()
	}
	return result
}

const destroyOne = async (contactId: number) => {
	const result = await contactModel.findByIdAndDelete(contactId)
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
