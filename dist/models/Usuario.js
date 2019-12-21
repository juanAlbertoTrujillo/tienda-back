"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemaUsuario = new mongoose_1.Schema({
    usuario: String,
    contrasena: String,
    sesion: { type: Boolean, default: false }
});
exports.default = mongoose_1.model('Usuario', schemaUsuario);
