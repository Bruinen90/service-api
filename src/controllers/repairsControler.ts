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
			addedDate: Date;
			completionDate: Date;
			[paramName: string]: string | number | boolean | Date;
		};
	};
}

export const newRepair = async (req: INewRepairRequest, res: Response) => {
	try {
		const repairToSave = new Repair(req.body);
		const savedRepair = await repairToSave.save();
		res.status(200).json(savedRepair._id);
	} catch (err) {
		console.log(err);
	}
};

interface IGetRepairRequest extends StandardRequest {
	body: {
		filterParam: string;
		filterValue: string | Date | boolean | number;
		filterEquity: '>=' | '==' | '<=';
	};
}

export const getRepair = async (req: IGetRepairRequest, res: Response) => {};
