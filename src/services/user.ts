import usersData from '../data/employee_data.json'
import { IUser } from '../models/user'
import { userModel } from '../models/user.model'

export const users = usersData as IUser[]

const fetchAll = async () => {
	const result = await userModel.find()
	if (result.length === 0)
		throw new Error('There is no users in the database.')
	return result
}

const fetchOne = async (userId: number) => {
	const result = await userModel.findById(userId)
	if (!result)
		throw new Error('There is no user with that ID in the database.')
	return result
}

const createOne = async (user: IUser) => {
	const result = await userModel.create(user)
	return result
}

const updateOne = async (userId: number, update: Partial<IUser>) => {
	await userModel.findByIdAndUpdate(userId, update, {
		new: true,
	})
	const result = await userModel.findById(userId)
	return result
}

const destroyOne = async (userId: number) => {
	const result = await userModel.findByIdAndDelete(userId)
	return result
}

export const userService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
