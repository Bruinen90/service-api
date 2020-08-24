import mongoose, { Schema } from 'mongoose';

const DeviceSchema = new Schema(
	{
		serialNumber: { type: String, required: true },
	},
	{ strict: false }
);

export default mongoose.model('Device', DeviceSchema);
