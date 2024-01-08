import { UserClientModel } from '../models/userClient.model'
import { IUserClient } from '../interfaces/userClient'

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

const updateOne = async (contactId: number, update: Partial<IUserClient>) => {
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
	updateOne,
	destroyOne,
}
