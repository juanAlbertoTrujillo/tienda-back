"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
//configuracion
app.set('port', process.env.PORT || 4000);
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api', index_1.default);
exports.default = app;
