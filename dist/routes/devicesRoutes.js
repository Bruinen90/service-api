"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const devicesControler_1 = require("../controllers/devicesControler");
const router = express_1.default.Router();
router.post('/new-device', devicesControler_1.newDevice);
router.get('/find-device', devicesControler_1.findDevice);
exports.default = router;
//# sourceMappingURL=devicesRoutes.js.map