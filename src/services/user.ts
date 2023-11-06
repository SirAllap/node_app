import usersData from '../data/employee_data.json'
import { IUser } from '../models/user'
import { SelectQuery } from '../util/util'

export const users = usersData as IUser[]

const fetchAll = async () => {
	const result = await SelectQuery('SELECT * FROM user;')
	return result
}

const fetchOne = async (userId: number) => {
	const result = await SelectQuery(`SELECT * FROM user WHERE id = ${userId};`)
	return result
}

const createOne = async (user: IUser) => {
	const currentUsersLength = users.length
	const result = await users.push(user)
	if (currentUsersLength === users.length)
		throw new Error('Error posting new user')
	return result
}

const updateOne = async (userId: number, update: Partial<IUser>) => {
	const id = userId.toString()
	const currentObjectIndex = users.findIndex(
		(user) => user.employee_id === id
	)
	if (currentObjectIndex === -1) throw new Error('User not found')
	const result = (users[currentObjectIndex] = {
		...users[currentObjectIndex],
		...update,
	})
	return result
}

const destroyOne = async (userId: number) => {
	const result = await SelectQuery(`DELETE FROM user WHERE id = ${userId};`)
	return result
}

export const userService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
