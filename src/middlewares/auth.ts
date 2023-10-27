import { authService } from '../services/auth'
import { NextFunction, Request, Response } from 'express'

interface IHeaders {
	token: string
}

export const authMiddleware = (
	req: Request & { headers: Partial<IHeaders> },
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.get('token') || ''
		authService.verifyJWT(token)
		next()
	} catch (error) {
		res.status(401).json({ error: true, message: 'You are not authorized' })
	}
}
