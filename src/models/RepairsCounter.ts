import mongoose, { Schema } from 'mongoose';

interface IRepairsCounter extends mongoose.Document {
	counter: number;
}

const RepairsCounter = new Schema({
	counter: { type: Number, default: 1 },
});

export default mongoose.model<IRepairsCounter>(
	'RepairsCounter',
	RepairsCounter
);
