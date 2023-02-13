import mongoose, { Schema } from 'mongoose';

interface IRepair extends mongoose.Document {
	customer: string;
	device: string;
	repairData: Date;
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
