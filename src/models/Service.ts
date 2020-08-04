import mongoose, { Document, Schema } from 'mongoose';

interface IService extends Document {
	login: string;
	password: string;
}

const ServiceSchema = new Schema({
	login: { type: String, required: true },
	password: { type: String, required: true },
});

export default mongoose.model<IService>('Service', ServiceSchema);
