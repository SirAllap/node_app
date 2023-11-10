import { IUser } from '../interface/user'
import { modifyQuery, selectQuery } from '../util/util'

const fetchAll = async () => {
	const query = `
	SELECT * 
	FROM user;
	`
	const result = await selectQuery(query)
	return result
}

const fetchOne = async (userId: number) => {
	const query = `
	SELECT * 
	FROM user WHERE id=?;
	`
	const params = [userId]
	const result = await selectQuery(query, params)
	return result
}

const createOne = async (user: IUser) => {
	const query = `
	INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) 
	VALUES (?, ?, ?, ?, ?, ?, ?);
	`
	const params = [
		user.full_name,
		user.email,
		user.photo,
		user.start_date,
		user.description,
		user.phone_number,
		user.status,
	]
	const result = modifyQuery(query, params)
	return result
}

const updateOne = async (userId: string, update: Partial<IUser>) => {
	const query = `
	UPDATE user
	SET full_name=?, email=?, photo=?, start_date=?, description=?, phone_number=?, status=?
	WHERE id=?;
	`
	const params = [
		update.full_name,
		update.email,
		update.photo,
		update.start_date,
		update.description,
		update.phone_number,
		update.status,
		userId,
	]
	const result = modifyQuery(query, params)

	return result
}

const destroyOne = async (userId: number) => {
	const query = `
	DELETE FROM user 
	WHERE id=?;
	`
	const params = [userId]
	const result = await selectQuery(query, params)

	return result
}

export const userService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
