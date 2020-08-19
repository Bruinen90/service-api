import express from 'express';
const router = express.Router();
import {
	newSettingsField,
	getSettingsFields,
	deleteSettingsField,
} from '../controllers/settingsControler';

router.post('/new-field', newSettingsField);
router.get('/all-fields', getSettingsFields);
router.delete('/delete-field/:fieldId', deleteSettingsField);

export default router;
