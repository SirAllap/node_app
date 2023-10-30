import bcrypt from 'bcrypt'
import { IUser } from '../interfaces/user'
import { userModel } from '../models/user.model'

const fetchAll = async () => {
	const result = await userModel.find({}, { password: 0 })
	if (result.length === 0)
		throw new Error('There is no users in the database.')
	return result
}

const fetchOne = async (userId: number) => {
	const result = await userModel.findById(userId, { password: 0 })
	if (!result)
		throw new Error('There is no user with that ID in the database.')
	return result
}

const createOne = async (user: IUser) => {
	user.password = bcrypt.hashSync(user.password || '', 10)
	const result = await userModel.create(user)
	return result
}

const updateOne = async (userId: number, update: Partial<IUser>) => {
	await userModel.findByIdAndUpdate(userId, update, {
		new: true,
	})
	const result = await userModel.findById(userId, { password: 0 })
	return result
}

const destroyOne = async (userId: number) => {
	const result = await userModel.findByIdAndDelete(userId, { password: 0 })
	return result
}

export const userService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
