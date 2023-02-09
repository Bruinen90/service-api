import express from 'express';
const router = express.Router();

import * as repairsController from '../controllers/repairsControler';

router.get('/get-all', repairsController.getAllRepairs);
router.post('/new-repair', repairsController.newRepair);

export default router;
