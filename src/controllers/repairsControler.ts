import mongoose, { Document } from 'mongoose';
// Types
import { StandardRequest } from './../types/common';
import { Response } from 'express';

// Models
import Repair from '../models/Repair';
import Customer from '../models/Customer';
import Device from '../models/Device';
import RepairsCounter from '../models/RepairsCounter';
import Serviceman from '../models/Serviceman';

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

interface IGetRepairRequest extends StandardRequest {
	body: {
		filterParam: string;
		filterValue: string | Date | boolean | number;
		filterEquity: '>=' | '==' | '<=';
	};
}

export const newRepair = async (req: INewRepairRequest, res: Response) => {
	const { serviceId } = req;
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
		const servicemanAssigned = await Serviceman.findOne({
			name: req.body.problem.serviceman as string,
		});

		if (!servicemanAssigned) {
			res.status(500).json({
				message: `No serviceman found for provided name ${req.body.problem.serviceman}`,
			});
		}

		const repairToSave = await new Repair({
			customer: customerToSave._id,
			device: deviceToSave._id,
			repairData: {
				...req.body.problem,
				serviceman: servicemanAssigned._id,
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

export const getRepair = async (req: IGetRepairRequest, res: Response) => {};

export const getAllRepairs = async (req: any, res: Response) => {
	try {
		const { serviceId } = req;
		const allRepairs = await Repair.find({ serviceId: serviceId })
			.populate('customer')
			.populate('device')
			.populate({
				path: 'repairData.serviceman',
				model: 'Serviceman',
			});
		res.status(200).json(allRepairs);
	} catch (err) {
		console.log(err);
	}
};
