// Types
import { StandardRequest } from './../types/common';
import { Request, Response } from 'express';

// Models
import Repair from '../models/Repair';

interface INewRepairRequest extends StandardRequest {
	body: {
		customerId: string;
		deviceId: string;
		repairData: {
			[paramName: string]: string | number | boolean;
		};
	};
}

export const newRepair = async (req: INewRepairRequest, res: Response) => {
	try {
		const repairToSave = new Repair(req.body);
		const savedRepair = await repairToSave.save();
		res.status(200).json(savedRepair);
	} catch (err) {
		console.log(err);
	}
};
