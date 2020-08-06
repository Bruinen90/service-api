import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

interface IIsAuth extends Request {
	isAuth: boolean;
	serviceId: string;
}

const isAuth = (req: IIsAuth, res: Response, next: NextFunction) => {
	const breakMiddleware = () => {
		req.isAuth = false;
		return next();
	};
	const authHeader = req.get('authorization');
	if (!authHeader) {
		return breakMiddleware();
	}
	const token = authHeader;
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return breakMiddleware();
	}
	if (!decodedToken) {
		return breakMiddleware();
	}
	req.serviceId = decodedToken.serviceId;
	req.isAuth = true;
	return next();
};

export default isAuth;
