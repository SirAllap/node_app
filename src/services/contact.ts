import contactData from '../data/client_review.json'
import { IContact } from '../models/contact'

export const contacts = contactData as IContact[]

const fetchAll = async () => {
	const result = await contacts
	if (!result) throw new Error('Error obtaining all contacts')
	return result
}

const fetchOne = async (contactId: number) => {
	const id = contactId.toString()
	const result = await contacts.filter((contact) => contact.id === id)
	if (result.length === 0) throw new Error('Bad request')
	return result
}

const createOne = async (contact: IContact) => {
	const currentContactLength = contacts.length
	const result = await contacts.push(contact)
	if (currentContactLength === contacts.length)
		throw new Error('Error posting new contact')
	return result
}

const updateOne = async (contactId: number, update: Partial<IContact>) => {
	const id = contactId.toString()
	const currentObjectIndex = contacts.findIndex(
		(contact) => contact.id === id
	)
	if (currentObjectIndex === -1) throw new Error('contact not found')
	const result = (contacts[currentObjectIndex] = {
		...contacts[currentObjectIndex],
		...update,
	})
	return result
}

const destroyOne = async (contactId: number) => {
	const id = contactId.toString()
	const currentObjectIndex = contacts.findIndex(
		(contact) => contact.id === id
	)
	if (currentObjectIndex === -1) throw new Error('contact not found')
	const result = await contacts.splice(currentObjectIndex, 1)
	return result
}

export const contactService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
