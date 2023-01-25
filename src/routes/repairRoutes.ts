import express from 'express';
const router = express.Router();

import * as repairsController from '../controllers/repairsControler';

router.post('/new-repair', repairsController.newRepair);

export default router;
