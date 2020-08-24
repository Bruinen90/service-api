"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDevice = exports.newDevice = void 0;
const Device_1 = __importDefault(require("../models/Device"));
exports.newDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ADD GUARD!!!
    try {
        const deviceToSave = new Device_1.default(req.body);
        const savedDevice = yield deviceToSave.save();
        res.status(200).json({ _id: savedDevice._id });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ADD GUARD!!!
    try {
        const { paramName, value } = req.params;
        const foundDevices = yield Device_1.default.find({ [paramName]: value });
        if (!foundDevices || foundDevices.length === 0) {
            return res.status(404).json({ message: 'No devices found' });
        }
        return res.status(200).json({ foundDevices });
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=devicesControler.js.map