import express from 'express';
import { newDevice, findDevice } from '../controllers/devicesControler';

const router = express.Router();

router.post('/new-device', newDevice);
router.get('/find-device', findDevice);

export default router;
