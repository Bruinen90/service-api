import express from 'express';
const router = express.Router();

import * as authControler from '../controllers/authControler';

router.post('/login', authControler.login);

export default router;
