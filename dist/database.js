"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function conexionDB() {
    const uri = "mongodb+srv://juan:J7898521j@findmebot-zvz03.mongodb.net/tiendita?retryWrites=true&w=majority";
    await mongoose_1.default.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
        .catch(err => console.log(err));
    console.log('Conectado a la base de datos');
}
exports.conexionDB = conexionDB;
// 'use strict'
// var mongoose = require('mongoose');
// const uri = "mongodb+srv://juan:J7898521j@findmebot-zvz03.mongodb.net/bot?retryWrites=true&w=majority";
// mongoose.connect(uri, { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("conexion exitosa");
// });
// module.exports = db;
