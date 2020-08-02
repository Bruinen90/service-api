import express from 'express';
const app = express();

import authRoutes from './routes/authRoutes';

app.use('/auth', authRoutes);

app.listen(8080);
