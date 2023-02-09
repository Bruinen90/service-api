// Types
import { StandardRequest } from './../types/common';
import { Response } from 'express';

// Models
import Repair from '../models/Repair';
import Customer from '../models/Customer';
import Device from '../models/Device';
import { json } from 'body-parser';

interface INewRepairRequest extends StandardRequest {
	body: {
		customer: any;
		device: any;
		problem: {
			addedDate: Date;
			[paramName: string]: string | number | boolean | Date;
		};
	};
}

export const newRepair = async (req: INewRepairRequest, res: Response) => {
	const { serviceId } = req;
	try {
		const customerToSave = await new Customer(req.body.customer);
		await customerToSave.save();
		const deviceToSave = await new Device(req.body.device);
		await deviceToSave.save();
		const repairToSave = await new Repair({
			customer: customerToSave._id,
			device: deviceToSave._id,
			repairData: {
				...req.body.problem,
				addedDate: new Date(),
			},
			serviceId: serviceId,
		});
		await repairToSave.save();
		console.log(repairToSave);
		// const repairToSave = new Repair(req.body);
		// const savedRepair = await repairToSave.save();
		// res.status(200).json(savedRepair._id);
		res.status(200);
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

export const getAllRepairs = async (req: any, res: Response) => {
	try {
		const { serviceId } = req;
		const allRepairs = await Repair.find({ serviceId: serviceId });
		res.status(200).json(allRepairs);
	} catch (err) {
		console.log(err);
	}
};
