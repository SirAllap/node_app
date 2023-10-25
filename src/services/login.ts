import jwt from 'jsonwebtoken'
import 'dotenv/config'
const defaultUser = {
	user: 'admin',
	password: 'admin',
}

const secret: string = process.env.TOKEN_SECRET || ''

async function login(user: string, pass: string) {
	if (defaultUser.user !== user || defaultUser.password !== pass)
		throw new Error('Credentials are wrong')
	return signJWT({ user })
}

function signJWT(payload: { user: string }) {
	const token = jwt.sign(payload, secret, { expiresIn: '1h' })
	return { payload, token }
}

// function verifyJWT(token: string) {
// 	// Verify the jwt token
// }

const authService = {
	login,
	// signJWT,
	// verifyJWT,
}

export default authService