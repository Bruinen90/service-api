"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const settingsControler_1 = require("../controllers/settingsControler");
router.post('/new-field', settingsControler_1.newSettingsField);
router.post('/new-serviceman', settingsControler_1.newServiceman);
router.put('/update-serviceman', settingsControler_1.updateServiceman);
router.get('/all-fields', settingsControler_1.getSettingsFields);
router.get('/get-all-servicemen', settingsControler_1.getAllServicemen);
router.delete('/delete-field/:fieldId', settingsControler_1.deleteSettingsField);
// router.delete('/delete-serviceman/:servicemanId', deleteServiceman);
router.get('/test-endpoint');
exports.default = router;
//# sourceMappingURL=settingsRoutes.js.map