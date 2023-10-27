import jwt from 'jsonwebtoken'
import 'dotenv/config'
const defaultUser = {
	user: 'admin',
	password: 'admin',
}

const secret: string = process.env.SECRET || ''

const login = async (user: string, pass: string) => {
	if (defaultUser.user !== user || defaultUser.password !== pass)
		throw new Error('Wrong credentials')
	else {
		const result = signJWT({ user })
		return result
	}
}

const signJWT = (payload: { user: string }) => {
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
