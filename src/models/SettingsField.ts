import mongoose, { Schema, Document } from 'mongoose';

export type FieldCategory = 'customers' | 'repairs' | 'devices';

interface SettingsField extends Document {
	_id: string;
	name: string;
	type: string;
	category: FieldCategory;
	serviceId: string;
	radios: string[];
}

const SettingsFieldSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	category: { type: String, required: true },
	serviceId: { type: String, required: true },
	radios: [String],
});

export default mongoose.model<SettingsField>(
	'SettingsField',
	SettingsFieldSchema
);
