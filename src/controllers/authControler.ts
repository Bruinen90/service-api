import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Models
import ServiceModel from '../models/Service';

interface LoginRequest extends Request {
	body: {
		login: string;
		password: string;
	};
}

export const login = async (req: LoginRequest, res: Response) => {
	const { login, password } = req.body;
	try {
		const reqService = await ServiceModel.findOne({ login: login });
		if (!reqService) {
			res.status(401).json('Not authenticated');
		}
		const passwordCorrect = await bcrypt.compare(
			password,
			reqService.password
		);
		if (!passwordCorrect) {
			res.status(401).json('Not authenticated');
		}
		const token = jwt.sign(
			{ serviceId: reqService._id.toString() },
			process.env.JWT_SECRET
		);
		return { token: token };
	} catch (err) {
		console.log(err);
	}
};

interface VerifyTokenRequest extends Request {
	isAuth: boolean;
	serviceId: string;
}

export const verifyToken = async (req: VerifyTokenRequest, res: Response) => {
	const { isAuth, serviceId } = req;
	if (!isAuth) {
		res.status(401).json('Not authenticated');
	}
	try {
		const service = await ServiceModel.findById(serviceId);
		if (!service) {
			res.status(401).json('Not authenticated');
		}
		return { serviceId: serviceId };
	} catch (err) {
		console.log(err);
	}
};
