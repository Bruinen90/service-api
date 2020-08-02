import { RequestHandler } from 'express';

export const login: RequestHandler = async (req, res) => {
	console.log('LOGGGING IN');
	res.status(200).json('Logg in success');
};
