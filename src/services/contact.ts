import contactData from '../data/client_review.json'
import { IContact } from '../models/contact'

export const contacts = contactData as IContact[]

async function get() {
	const result = await contacts
	if (!result) throw new Error('Error obtaining all contacts')
	return result
}

async function getById(contactId: number) {
	const id = contactId.toString()
	const result = await contacts.filter((contact) => contact.id === id)
	if (result.length === 0) throw new Error('Bad request')
	return result
}

async function post(contact: IContact) {
	const currentContactLength = contacts.length
	const result = await contacts.push(contact)
	if (currentContactLength === contacts.length)
		throw new Error('Error posting new contact')
	return result
}

async function put(contactId: number, update: Partial<IContact>) {
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

async function _delete(contactId: number) {
	const id = contactId.toString()
	const currentObjectIndex = contacts.findIndex(
		(contact) => contact.id === id
	)
	if (currentObjectIndex === -1) throw new Error('contact not found')
	const result = await contacts.splice(currentObjectIndex, 1)
	return result
}

export const contactService = {
	get,
	getById,
	post,
	put,
	delete: _delete,
}
