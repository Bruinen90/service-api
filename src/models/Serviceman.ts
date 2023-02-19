import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceman extends Document {
	name: string;
	phonenumber?: string;
	email?: string;
}

const ServicemanSchema = new Schema({
	name: { type: String, required: true },
	phonenumber: String,
	email: String,
});

export default mongoose.model<IServiceman>('Serviceman', ServicemanSchema);
