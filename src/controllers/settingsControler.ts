import { Request, Response } from 'express';
import SettingsField from '../models/SettingsField';

interface NewSettingsFieldReq extends Request {
	serviceId: string;
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
	const { name, type, category, radios } = req.body;
	const alreadyExist = await SettingsField.findOne({
		name: name,
		category: category,
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
		const newField = new SettingsField(req.body);
		const savedField = await newField.save();
		if (!savedField._id) {
			return res.status(500).json({ message: 'Internal server error' });
		}
		return res.status(201).json({ _id: savedField._id });
	} else {
		return res.status(400).json({ message: 'Insunfficient data provided' });
	}
};
