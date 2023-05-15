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
exports.findCustomer = exports.newCustomer = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
exports.newCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.serviceId) {
        return res.status(401);
    }
    try {
        const { phoneNumber } = req.body;
        const duplicate = yield Customer_1.default.findOne({ phoneNumber: phoneNumber });
        if (duplicate) {
            return res.status(409).json({
                message: 'Customer with provided phone number already exists',
            });
        }
        const customer = new Customer_1.default(Object.assign(Object.assign({}, req.body), { serviceId: req.serviceId }));
        yield customer.save();
        res.status(200).json({ _id: customer._id });
    }
    catch (err) {
        console.log(err);
    }
});
exports.findCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.serviceId) {
        return res.status(401);
    }
    const key = Object.keys(req.query)[0];
    try {
        const foundCustomers = yield Customer_1.default.find({
            [key]: { $regex: req.query[key], $options: 'i' },
        });
        return res.status(200).json({ customers: foundCustomers });
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=customersControler.js.map