import express from 'express';
const router = express.Router();
import {
	newSettingsField,
	getSettingsFields,
	deleteSettingsField,
	newServiceman,
} from '../controllers/settingsControler';

router.post('/new-field', newSettingsField);
router.post('/new-serviceman', newServiceman);
router.get('/all-fields', getSettingsFields);
router.delete('/delete-field/:fieldId', deleteSettingsField);

export default router;
