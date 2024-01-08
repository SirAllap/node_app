import bcrypt from 'bcryptjs'
import { IUser } from '../interfaces/user'
import { UserClientModel } from '../models/userClient.model'

const fetchAll = async () => {
	const result = await UserClientModel.find({}, { password: 0 })
	if (result.length === 0)
		throw new Error('There is no users in the database.')
	return result
}

const fetchOne = async (userId: number) => {
	const result = await UserClientModel.findById(userId, { password: 0 })
	if (!result)
		throw new Error('There is no user with that ID in the database.')
	return result
}

const createOne = async (user: IUser) => {
	user.password = bcrypt.hashSync(user.password || '', 10)
	const result = await UserClientModel.create(user)
	return result
}

const updateOne = async (contactId: number, update: Partial<IUser>) => {
	const result = await UserClientModel.findByIdAndUpdate(contactId, update, {
		new: true,
	})
	if (!result) {
		throw new Error()
	}
	return result
}

const destroyOne = async (contactId: number) => {
	const result = await UserClientModel.findByIdAndDelete(contactId)
	if (!result) {
		throw new Error()
	}
	return result
}

export const userClientService = {
	fetchAll,
	fetchOne,
	createOne,
	updateOne,
	destroyOne,
}
