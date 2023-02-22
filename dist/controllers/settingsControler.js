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
exports.getAllServicemen = exports.newServiceman = exports.getSettingsFields = exports.deleteSettingsField = exports.newSettingsField = void 0;
const SettingsField_1 = __importDefault(require("../models/SettingsField"));
const Serviceman_1 = __importDefault(require("../models/Serviceman"));
exports.newSettingsField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req;
    const { _id, name, type, category, radios, required } = req.body;
    if (_id) {
        const foundField = yield SettingsField_1.default.findById(_id);
        if (!foundField) {
            return res
                .status(404)
                .json({ message: 'Field ID provided but not found id DB' });
        }
        yield foundField.update({ name, type, radios, required });
        yield foundField.save();
        return res
            .status(204)
            .json({ message: 'Field successfully updated', _id });
    }
    const alreadyExist = yield SettingsField_1.default.findOne({
        name,
        category: category,
        serviceId,
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
        const newField = new SettingsField_1.default({
            name,
            category,
            type,
            serviceId,
            required,
            radios: radios,
        });
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
exports.deleteSettingsField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req;
    const { fieldId } = req.params;
    const deletedField = yield SettingsField_1.default.findById(fieldId);
    if (!serviceId || !deletedField || deletedField.serviceId !== serviceId) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    yield SettingsField_1.default.deleteOne({ _id: fieldId });
    res.status(200).json({ message: `Record ${fieldId} successfully deleted` });
});
exports.getSettingsFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req;
    const allSettingsFields = yield SettingsField_1.default.find({
        serviceId: serviceId,
    });
    return res.status(200).json({ allSettingsFields });
});
exports.newServiceman = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req;
    const { name, email, phonenumber } = req.body;
    if (!serviceId) {
        // Throw auth error
    }
    try {
        const duplicateServiceman = yield Serviceman_1.default.findOne({
            serviceId: serviceId,
            $or: [
                { name: name },
                { email: email },
                { phonenumber: phonenumber },
            ],
        });
        if (duplicateServiceman) {
            return res.status(409).json({
                message: 'Serviceman with such data already exist in database',
                duplicateServicemanData: duplicateServiceman,
            });
        }
        const newServiceman = yield new Serviceman_1.default({
            name,
            email,
            phonenumber,
            service: serviceId,
        });
        const savedServiceman = yield newServiceman.save();
        return res.status(201).json({ _id: savedServiceman._id });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAllServicemen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = req;
    if (!serviceId) {
        // Throw auth error
    }
    try {
        const allServicemen = yield Serviceman_1.default.find({ service: serviceId });
        res.status(200).json({ allServicemen });
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=settingsControler.js.map