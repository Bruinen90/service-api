import express from 'express';
const router = express.Router();
import { newSettingsField } from '../controllers/settingsControler';

router.post('/new-field', newSettingsField);

export default router;
