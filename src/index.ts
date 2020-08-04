import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

import authRoutes from './routes/authRoutes';

app.use('/auth', authRoutes);

const spinnUp = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://bruinen:${process.env.MONGO_PASSWORD}@nodecourse-wx0jk.gcp.mongodb.net/service`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
		app.listen(process.env.PORT || 8080);
	} catch (error) {
		console.log(error);
	}
};

spinnUp();
