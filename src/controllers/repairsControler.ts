import mongoose, { Document } from 'mongoose';
// Types
import { StandardRequest } from './../types/common';
import { Response } from 'express';

// Models
import Repair from '../models/Repair';
import Customer from '../models/Customer';
import Device from '../models/Device';
import RepairsCounter from '../models/RepairsCounter';
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
	console.log('new repair...');
	try {
		const customerToSave = await new Customer(req.body.customer);
		await customerToSave.save();
		const deviceToSave = await new Device(req.body.device);
		await deviceToSave.save();
		const lastRepairCounter = await RepairsCounter.findOne({});
		// In case it's first repair in DB
		if (!lastRepairCounter) {
			const newCounter = await new RepairsCounter({ counter: 1 });
			newCounter.save();
		} else {
			await lastRepairCounter.counter++;
			lastRepairCounter.save();
		}
		const repairToSave = await new Repair({
			customer: customerToSave._id,
			device: deviceToSave._id,
			repairData: {
				...req.body.problem,
				addedDate: new Date(),
				number: lastRepairCounter.counter,
			},
			serviceId: serviceId,
		});
		const savedRepair = await repairToSave.save();
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
		const allRepairs = await Repair.find({ serviceId: serviceId })
			.populate('customer')
			.populate('device');
		res.status(200).json(allRepairs);
	} catch (err) {
		console.log(err);
	}
};
