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
exports.verifyToken = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Models
const Service_1 = __importDefault(require("../models/Service"));
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        const reqService = yield Service_1.default.findOne({ login: login });
        if (!reqService) {
            return res.status(401).json('Not authenticated');
        }
        console.log(password, reqService.password);
        const passwordCorrect = yield bcrypt_1.default.compareSync(password, reqService.password);
        console.log('PASSWORD CORRECT:', passwordCorrect);
        if (!passwordCorrect) {
            return res.status(401).json('Not authenticated');
        }
        const token = jsonwebtoken_1.default.sign({ serviceId: reqService._id.toString() }, process.env.JWT_SECRET);
        return res.status(200).json({
            token: token,
            _id: reqService._id,
            name: reqService.login,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isAuth, serviceId } = req;
    if (!isAuth) {
        return res.status(401).json('Not authenticated');
    }
    try {
        const service = yield Service_1.default.findById(serviceId);
        if (!service) {
            return res.status(401).json('Not authenticated');
        }
        return res.status(200).json({ _id: serviceId, name: service.login });
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=authControler.js.map