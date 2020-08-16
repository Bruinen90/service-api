"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const settingsControler_1 = require("../controllers/settingsControler");
router.post('/new-field', settingsControler_1.newSettingsField);
exports.default = router;
//# sourceMappingURL=settingsRoutes.js.map