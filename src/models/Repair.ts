import mongoose, { Schema } from 'mongoose';

const RepairSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Customer',
		},
		deviceId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Device',
		},
		repairData: {
			addedDate: { type: Date, required: true },
			completionDate: { type: Date, required: true },
		},
	},
	{ strict: false }
);

export default mongoose.model('Repair', RepairSchema);
