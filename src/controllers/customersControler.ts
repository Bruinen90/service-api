import { Response } from 'express';
import { StandardRequest } from '../types/common';

import Customer from '../models/Customer';

interface INewCustomerReq extends StandardRequest {
	body: {
		phoneNumber: string;
		[custmerField: string]: string | boolean | number;
	};
}

export const newCustomer = async (req: INewCustomerReq, res: Response) => {
	if (!req.serviceId) {
		return res.status(401);
	}
	try {
		const { phoneNumber } = req.body;
		const duplicate = await Customer.findOne({ phoneNumber: phoneNumber });
		if (duplicate) {
			return res.status(409).json({
				message: 'Customer with provided phone number already exists',
			});
		}
		const customer = new Customer({
			...req.body,
			serviceId: req.serviceId,
		});
		await customer.save();
		res.status(200).json({ _id: customer._id });
	} catch (err) {
		console.log(err);
	}
};
