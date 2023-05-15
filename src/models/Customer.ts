import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema(
	{
		phoneNumber: { type: String, required: true },
		devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
	},
	{ strict: false }
);

export default mongoose.model('Customer', CustomerSchema);
