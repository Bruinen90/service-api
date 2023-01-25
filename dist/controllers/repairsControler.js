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
exports.getRepair = exports.newRepair = void 0;
// Models
const Repair_1 = __importDefault(require("../models/Repair"));
exports.newRepair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repairToSave = new Repair_1.default(req.body);
        const savedRepair = yield repairToSave.save();
        res.status(200).json(savedRepair._id);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRepair = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
//# sourceMappingURL=repairsControler.js.map