import express from 'express';
const router = express.Router();

import * as customersController from '../controllers/customersControler';

router.post('/new-customer', customersController.newCustomer);

export default router;
