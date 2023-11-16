import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/user'
import { UserModel } from '../models/user.model'

const fetchAll = async () => {
	const result = await UserModel.find({}, { password: 0 })
	if (result.length === 0)
		throw new Error('There is no users in the database.')
	return result
}

const fetchOne = async (userId: number) => {
	const result = await UserModel.findById(userId, { password: 0 })
	if (!result)
		throw new Error('There is no user with that ID in the database.')
	return result
}

const createOne = async (user: IUser) => {
	user.password = bcrypt.hashSync(user.password || '', 10)
	const result = await UserModel.create(user)
	return result
}

export const userService = {
	fetchAll,
	fetchOne,
	createOne,
}
