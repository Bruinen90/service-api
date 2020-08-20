import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Routes
import authRoutes from './routes/authRoutes';
import settingsRoutes from './routes/settingsRoutes';
import customersRoutes from './routes/customersRoutes';

// Middleware
import isAuth from './middleware/isAuth';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.use(isAuth);

app.use('/auth', authRoutes);
app.use('/settings', settingsRoutes);
app.use('/customers', customersRoutes);

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
