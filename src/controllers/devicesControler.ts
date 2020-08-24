import { StandardRequest } from '../types/common';
import { Response, Request } from 'express';

import Device from '../models/Device';

interface INewDeviceRequest extends StandardRequest {
	body: {
		serialNumber: string;
		[deviceField: string]: string | boolean | number;
	};
}

export const newDevice = async (req: INewDeviceRequest, res: Response) => {
	// ADD GUARD!!!
	try {
		const deviceToSave = new Device(req.body);
		const savedDevice = await deviceToSave.save();
		res.status(200).json({ _id: savedDevice._id });
	} catch (err) {
		console.log(err);
	}
};

export const findDevice = async (req: Request, res: Response) => {
	// ADD GUARD!!!
	try {
		const { paramName, value } = req.params;
		const foundDevices = await Device.find({ [paramName]: value });
		if (!foundDevices || foundDevices.length === 0) {
			return res.status(404).json({ message: 'No devices found' });
		}
		return res.status(200).json({ foundDevices });
	} catch (err) {
		console.log(err);
	}
};
