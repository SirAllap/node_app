import usersData from '../data/employee_data.json'
import { IUser } from '../models/user'

export const users = usersData as IUser[]

const fetchAll = async () => {
	const result = await users
	if (!result) throw new Error('Error obtaining all users')
	return result
}

const fetchOne = async (userId: number) => {
	const id = userId.toString()
	const result = await users.filter((user) => user.employee_id === id)
	if (result.length === 0) throw new Error('Bad request')
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
	const id = userId.toString()
	const currentObjectIndex = users.findIndex(
		(user) => user.employee_id === id
	)
	if (currentObjectIndex === -1) throw new Error('User not found')
	const result = await users.splice(currentObjectIndex, 1)
	return result
}

export const userService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
