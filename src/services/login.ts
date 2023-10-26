import jwt from 'jsonwebtoken'
import 'dotenv/config'
const defaultUser = {
	user: 'admin',
	password: 'admin',
}

const secret: string = process.env.SECRET || ''

async function login(user: string, pass: string) {
	if (defaultUser.user !== user || defaultUser.password !== pass)
		throw new Error('Credentials are wrong')
	else {
		const result = await signJWT({ user })
		return result
	}
}

function signJWT(payload: { user: string }) {
	const token = jwt.sign(payload, secret, { expiresIn: '1h' })
	return { payload, token }
}

function verifyJWT(token: string) {
	jwt.verify(token, secret, (err, token) => {
		if (err) throw new Error('You are not authorized')
		return token
	})
}

const authService = {
	login,
	signJWT,
	verifyJWT,
}

export default authService
