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
const Customer_1 = __importDefault(require("../models/Customer"));
const Device_1 = __importDefault(require("../models/Device"));
exports.newRepair = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const customerToSave = yield new Customer_1.default(req.body.customer);
        yield customerToSave.save();
        const deviceToSave = yield new Device_1.default(req.body.device);
        yield deviceToSave.save();
        const repairToSave = yield new Repair_1.default({
            customer: customerToSave._id,
            device: deviceToSave._id,
            repairData: Object.assign(Object.assign({}, req.body.problem), { addedDate: new Date() }),
        });
        yield repairToSave.save();
        console.log(repairToSave);
        // const repairToSave = new Repair(req.body);
        // const savedRepair = await repairToSave.save();
        // res.status(200).json(savedRepair._id);
        res.status(200);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getRepair = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
//# sourceMappingURL=repairsControler.js.map