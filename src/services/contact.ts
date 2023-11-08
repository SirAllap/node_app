import { IContact } from '../interface/contact'
import { ModifyQuery, SelectQuery } from '../util/util'

const fetchAll = async () => {
	const query = `
	SELECT * 
	FROM contact;
	`
	const result = await SelectQuery(query)
	return result
}

const fetchOne = async (contactId: number) => {
	const query = `
	SELECT * 
	FROM contact
	WHERE id=?
	;
	`
	const params = [contactId]
	const result = await SelectQuery(query, params)
	return result
}

const createOne = async (contact: IContact) => {
	const query = `
	INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status)
	VALUES (?, ?, ?, ?, ?, ?, ?);
	`
	const params = [
		contact.full_name,
		contact.email,
		contact.phone_number,
		contact.subject_of_review,
		contact.review_body,
		contact.date,
		contact.status,
	]
	const result = await ModifyQuery(query, params)
	return result
}

const updateOne = async (contactId: number, update: Partial<IContact>) => {
	const query = `
	UPDATE contact
	SET full_name = ?, email = ?, phone_number = ?, subject_of_review = ?, review_body = ?, date = ?, status = ?
	WHERE id = ?;
	`
	const params = [
		update.full_name,
		update.email,
		update.phone_number,
		update.subject_of_review,
		update.review_body,
		update.date,
		update.status,
		contactId,
	]
	const result = await ModifyQuery(query, params)
	return result
}

const destroyOne = async (contactId: number) => {
	const query = `
	DELETE FROM contact
	WHERE id=?;`
	const params = [contactId]
	const result = await SelectQuery(query, params)
	return result
}

export const contactService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
