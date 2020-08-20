import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema(
	{
		phone: { type: String, required: true },
	},
	{ strict: false }
);

export default mongoose.model('Customer', CustomerSchema);
