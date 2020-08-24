import mongoose, { Schema } from 'mongoose';

const RepairSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Customer',
	},
	deviceId: { type: Schema.Types.ObjectId, required: true, ref: 'Device' },
	repairData: Schema.Types.Mixed,
});

export default mongoose.model('Repair', RepairSchema);
