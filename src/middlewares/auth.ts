import authService from '../services/login'
import { NextFunction, Request, Response } from 'express'

interface IHeaders {
	token: string
}

export default function authMiddleware(
	req: Request & { headers: Partial<IHeaders> },
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.get('token') || ''
		authService.verifyJWT(token)
		next()
	} catch (error) {
		res.status(404).json(`${error}`)
	}
}
