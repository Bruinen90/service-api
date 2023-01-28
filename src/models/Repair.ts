import mongoose, { Schema } from 'mongoose';

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
	},
	{ strict: false }
);

export default mongoose.model('Repair', RepairSchema);
