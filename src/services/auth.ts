import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { UserModel } from '../models/user.model'
import { IUserClient } from '../interfaces/userClient'
import { UserClientModel } from '../models/userClient.model'

const secret: string = process.env.SECRET || ''

interface IUserInfo {
	email: string
	name: string
	role: string
	photo: string
}

const signup = async (user: IUserClient) => {
	user.password = bcrypt.hashSync(user.password || '', 10)
	const result = await UserClientModel.create(user)
	return result
}

const login = async (email: string, password: string) => {
	const result = await UserModel.findOne({ email: email })
	if (!result) throw new Error()
	const passwordCheck = await bcrypt.compare(password, result.password || '')
	if (!passwordCheck) throw new Error()
	const userInfo: IUserInfo = {
		email: result.email,
		name: result.full_name,
		role: result.description,
		photo: result.photo,
	}
	return signJWT({ userInfo })
}

const signJWT = (payload: { userInfo: IUserInfo }) => {
	const token = jwt.sign(payload, secret, { expiresIn: '5h' })
	return { payload, token }
}

const verifyJWT = (token: string) => {
	const payload = jwt.verify(token, secret)
	return payload
}

export const authService = {
	signup,
	login,
	signJWT,
	verifyJWT,
}
