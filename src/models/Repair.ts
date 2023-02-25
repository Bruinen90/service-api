import mongoose, { Schema } from 'mongoose';
import { IServiceman } from './Serviceman';

interface IRepair extends mongoose.Document {
	customer: string;
	device: string;
	repairData: {
		addedDate: Date;
		serviceman: IServiceman | string;
		[key: string]: any;
	};
	serviceId: string;
}

const RepairSchema = new Schema(
	{
		customer: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Customer',
		},
		device: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Device',
		},
		repairData: {
			addedDate: { type: Date, required: true },
			serviceman: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Serviceman',
			},
		},
		serviceId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Service',
		},
	},
	{ strict: false }
);

export default mongoose.model<IRepair>('Repair', RepairSchema);
