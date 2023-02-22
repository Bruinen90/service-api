"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settingsControler_1 = require("./../controllers/settingsControler");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const settingsControler_2 = require("../controllers/settingsControler");
router.post('/new-field', settingsControler_2.newSettingsField);
router.post('/new-serviceman', settingsControler_2.newServiceman);
router.get('/all-fields', settingsControler_2.getSettingsFields);
router.get('/get-all-servicemen', settingsControler_1.getAllServicemen);
router.delete('/delete-field/:fieldId', settingsControler_2.deleteSettingsField);
exports.default = router;
//# sourceMappingURL=settingsRoutes.js.map