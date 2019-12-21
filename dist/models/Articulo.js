"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    categoria: Number,
    codigo: Number,
    imagenURL: String
});
exports.default = mongoose_1.model('Articulo', schema);
