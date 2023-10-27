import contactData from '../data/client_review.json'
import { IContact } from '../models/contact'
import { contactModel } from '../models/contact.model'

export const contacts = contactData as IContact[]

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
	await contactModel.findByIdAndUpdate(contactId, update)
	const result = await contactModel.findById(contactId)
	return result
}

const destroyOne = async (contactId: number) => {
	const result = await contactModel.findByIdAndDelete(contactId)
	return result
}

export const contactService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
