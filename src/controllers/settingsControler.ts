import { Request, Response } from 'express';
import SettingsField from '../models/SettingsField';

interface StandardRequest extends Request {
	serviceId: string;
}

interface NewSettingsFieldReq extends StandardRequest {
	body: {
		name: string;
		type: string;
		category: string;
		radios?: string[];
	};
}

export const newSettingsField = async (
	req: NewSettingsFieldReq,
	res: Response
) => {
	console.log(req.body);
	const { serviceId } = req;
	const { name, type, category, radios } = req.body;
	const alreadyExist = await SettingsField.findOne({
		name,
		category,
		serviceId,
	});
	if (
		name &&
		type &&
		category &&
		(category !== 'radios' || (radios && radios.length > 0))
	) {
		if (alreadyExist) {
			return res.status(409).json({
				message: `Settings field with name "${name}" already exist in category "${category}"`,
			});
		}
		const newField = new SettingsField({
			name,
			category,
			type,
			serviceId,
			radios: radios,
		});
		const savedField = await newField.save();
		if (!savedField._id) {
			return res.status(500).json({ message: 'Internal server error' });
		}
		return res.status(201).json({ _id: savedField._id });
	} else {
		return res.status(400).json({ message: 'Insunfficient data provided' });
	}
};

export const getSettingsFields = async (
	req: StandardRequest,
	res: Response
) => {
	const { serviceId } = req;
	const allSettingsFields = await SettingsField.find({
		serviceId: serviceId,
	});
	return res.status(200).json({ allSettingsFields });
};
