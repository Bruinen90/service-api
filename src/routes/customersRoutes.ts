import express from 'express';
const router = express.Router();

import * as customersController from '../controllers/customersControler';

router.get('/find', customersController.findCustomer);
router.post('/new-customer', customersController.newCustomer);

export default router;
