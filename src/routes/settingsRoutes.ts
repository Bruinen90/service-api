import express from 'express';
const router = express.Router();
import {
	newSettingsField,
	getSettingsFields,
} from '../controllers/settingsControler';

router.post('/new-field', newSettingsField);
router.get('/all-fields', getSettingsFields);

export default router;
