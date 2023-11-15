import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { UserModel } from '../models/user.model'

const secret: string = process.env.SECRET || ''

const login = async (email: string, password: string) => {
	const result = await UserModel.findOne({ email: email })
	if (!result) throw new Error()
	const passwordCheck = await bcrypt.compare(password, result.password || '')
	if (!passwordCheck) throw new Error()
	return signJWT({ email })
}

const signJWT = (payload: { email: string }) => {
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
