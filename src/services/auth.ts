import jwt from 'jsonwebtoken'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { userModel } from '../models/user.model'

const secret: string = process.env.SECRET || ''

const login = async (email: string, password: string) => {
	const result = await userModel.findOne({ email: email })
	if (!result) throw new Error('User not found')
	bcrypt.compare(password, result.password || '', (err, res) => {
		if (err) throw new Error('Something went wrong')
		if (!res) throw new Error('Email or password incorrect')
	})
	const signResponse = signJWT({ email })
	return signResponse
}

const signJWT = (payload: { email: string }) => {
	const token = jwt.sign(payload, secret, { expiresIn: '1h' })
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
