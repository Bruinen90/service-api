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
exports.newSettingsField = void 0;
const SettingsField_1 = __importDefault(require("../models/SettingsField"));
exports.newSettingsField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type, category, radios } = req.body;
    const alreadyExist = yield SettingsField_1.default.findOne({
        name: name,
        category: category,
    });
    if (name &&
        type &&
        category &&
        (category !== 'radios' || (radios && radios.length > 0))) {
        if (alreadyExist) {
            return res.status(409).json({
                message: `Settings field with name "${name}" already exist in category "${category}"`,
            });
        }
        const newField = new SettingsField_1.default(req.body);
        const savedField = yield newField.save();
        if (!savedField._id) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        return res.status(201).json({ _id: savedField._id });
    }
    else {
        return res.status(400).json({ message: 'Insunfficient data provided' });
    }
});
//# sourceMappingURL=settingsControler.js.map