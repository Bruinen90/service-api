import { response, Response } from 'express';
import SettingsField, { FieldCategory } from '../models/SettingsField';
import { StandardRequest } from '../types/common';
import Serviceman from '../models/Serviceman';

interface NewSettingsFieldReq extends StandardRequest {
	body: {
		_id?: string;
		name: string;
		type: string;
		category: string;
		radios?: string[];
		required?: boolean;
	};
}

interface NewServicemanReq extends StandardRequest {
	body: {
		name: string;
		email?: string;
		phonenumber?: string;
	};
}

interface UpdateServicemanReq extends StandardRequest {
	body: {
		name: string;
		email?: string;
		phonenumber?: string;
		_id: string;
	};
}

export const newSettingsField = async (
	req: NewSettingsFieldReq,
	res: Response
) => {
	const { serviceId } = req;
	const { _id, name, type, category, radios, required } = req.body;
	if (_id) {
		const foundField = await SettingsField.findById(_id);
		if (!foundField) {
			return res
				.status(404)
				.json({ message: 'Field ID provided but not found id DB' });
		}
		await foundField.update({ name, type, radios, required });
		await foundField.save();
		return res
			.status(204)
			.json({ message: 'Field successfully updated', _id });
	}
	const alreadyExist = await SettingsField.findOne({
		name,
		category: category as FieldCategory,
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
			required,
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

export const deleteSettingsField = async (
	req: StandardRequest,
	res: Response
) => {
	const { serviceId } = req;
	const { fieldId } = req.params;
	const deletedField = await SettingsField.findById(fieldId);
	if (!serviceId || !deletedField || deletedField.serviceId !== serviceId) {
		return res.status(401).json({ message: 'Not authorized' });
	}
	await SettingsField.deleteOne({ _id: fieldId });
	res.status(200).json({ message: `Record ${fieldId} successfully deleted` });
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

export const newServiceman = async (req: NewServicemanReq, res: Response) => {
	const { serviceId } = req;
	const { name, email, phonenumber } = req.body;
	if (!serviceId) {
		// Throw auth error
	}
	try {
		const duplicateServiceman = await Serviceman.findOne({
			serviceId: serviceId,
			$or: [
				{ name: name },
				{ email: email },
				{ phonenumber: phonenumber },
			],
		});
		if (duplicateServiceman) {
			return res.status(409).json({
				message: 'Serviceman with such data already exist in database',
				duplicateServicemanData: duplicateServiceman,
			});
		}
		const newServiceman = await new Serviceman({
			name,
			email,
			phonenumber,
			service: serviceId,
		});
		const savedServiceman = await newServiceman.save();
		return res.status(201).json({ _id: savedServiceman._id });
	} catch (err) {
		console.log(err);
	}
};

export const getAllServicemen = async (req: StandardRequest, res: Response) => {
	const { serviceId } = req;
	if (!serviceId) {
		// Throw auth error
	}
	try {
		const allServicemen = await Serviceman.find({ service: serviceId });
		return res.status(200).json({ allServicemen });
	} catch (err) {
		console.log(err);
	}
};

export const updateServiceman = async (
	req: UpdateServicemanReq,
	res: Response
) => {
	const { serviceId } = req;
	if (!serviceId) {
		return res.status(401);
	}
	try {
		const updatedDoc = await Serviceman.findByIdAndUpdate(
			req.body._id,
			req.body
		);
		if (updatedDoc) {
			return res.status(200);
		} else {
			return res.status(500);
		}
	} catch (err) {
		console.log(err);
	}
};

export const deleteServiceman = async (req: StandardRequest, res: Response) => {
	const { serviceId } = req;
	const { servicemanId } = req.params;
	try {
		if (!serviceId) {
			return res.status(401);
		}
		await Serviceman.findByIdAndDelete(servicemanId);
		return res.status(200).json({ message: 'Serviceman deleted' });
	} catch (err) {
		console.log(err);
	}
};
