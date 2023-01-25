import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema(
	{
		phoneNumber: { type: String, required: true },
	},
	{ strict: false }
);

export default mongoose.model('Customer', CustomerSchema);
