import mongoose, { Schema } from 'mongoose';

const DeviceSchema = new Schema({}, { strict: false });

export default mongoose.model('Device', DeviceSchema);
