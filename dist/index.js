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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes"));
const customersRoutes_1 = __importDefault(require("./routes/customersRoutes"));
const devicesRoutes_1 = __importDefault(require("./routes/devicesRoutes"));
// Middleware
const isAuth_1 = __importDefault(require("./middleware/isAuth"));
require('dotenv').config();
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
app.use(isAuth_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/settings', settingsRoutes_1.default);
app.use('/customers', customersRoutes_1.default);
app.use('/devices', devicesRoutes_1.default);
const spinnUp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://bruinen:${process.env.MONGO_PASSWORD}@nodecourse-wx0jk.gcp.mongodb.net/service`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(process.env.PORT || 8080);
    }
    catch (error) {
        console.log(error);
    }
});
spinnUp();
//# sourceMappingURL=index.js.map