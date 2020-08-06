import express from 'express';
const router = express.Router();

import * as authControler from '../controllers/authControler';

router.post('/login', authControler.login);
router.post('/verifyToken', authControler.verifyToken);

export default router;
