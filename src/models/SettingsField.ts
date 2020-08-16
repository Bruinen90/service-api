import mongoose, { Schema } from 'mongoose';

const SettingsFieldSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	category: { type: String, required: true },
	serviceId: { type: String, required: true },
	radios: [String],
});

export default mongoose.model('SettingsField', SettingsFieldSchema);
