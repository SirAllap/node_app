import contactData from '../data/client_review.json'
import { IContact } from '../models/contact'
import { SelectQuery } from '../util/util'

export const contacts = contactData as IContact[]

const fetchAll = async () => {
	const result = await SelectQuery('SELECT * FROM contact;')
	return result
}

const fetchOne = async (contactId: number) => {
	const result = await SelectQuery(
		`SELECT * FROM contact WHERE id = ${contactId};`
	)
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
	const result = await SelectQuery(
		`DELETE FROM contact WHERE id = ${contactId};`
	)
	return result
}

export const contactService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
