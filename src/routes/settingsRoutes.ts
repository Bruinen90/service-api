import express from 'express';
const router = express.Router();
import {
	newSettingsField,
	getSettingsFields,
	deleteSettingsField,
	newServiceman,
	getAllServicemen,
	updateServiceman,
} from '../controllers/settingsControler';

router.post('/new-field', newSettingsField);
router.post('/new-serviceman', newServiceman);
router.put('/update-serviceman', updateServiceman);
router.get('/all-fields', getSettingsFields);
router.get('/get-all-servicemen', getAllServicemen);
router.delete('/delete-field/:fieldId', deleteSettingsField);

export default router;
