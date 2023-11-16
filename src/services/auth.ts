import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { UserModel } from '../models/user.model'

const secret: string = process.env.SECRET || ''

interface IUserInfo {
	email: string
	name: string
	role: string
	photo: string
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
	login,
	signJWT,
	verifyJWT,
}
