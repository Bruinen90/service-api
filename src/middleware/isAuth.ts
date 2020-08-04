import { Request, Response, NextFunction } from 'express';

const jws = require('jsonwebtoken');

interface IIsAuth extends Request {
	isAuth: boolean;
	serviceId: string;
}

module.exports = (req: IIsAuth, res: Response, next: NextFunction) => {
	const breakMiddleware = () => {
		req.isAuth = false;
		return next();
	};
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		return breakMiddleware();
	}
	const token = authHeader;
	let decodedToken;
	try {
		decodedToken = jws.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return breakMiddleware();
	}
	if (!decodedToken) {
		return breakMiddleware();
	}
	req.serviceId = decodedToken.userId;
	req.isAuth = true;
	return next();
};
