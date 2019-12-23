"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    categoria: Number,
    codigo: Number,
    imagenURL: String,
    cantidad: {
        type: Number, default: 1
    },
    usuario: {
        type: String, default: null
    },
    identificador: String
});
// interface ICarrito extends Document{
//     codigo: number,
//     cantidad: number,
//     usuario: string,
//     identificador: string
// }
exports.default = mongoose_1.model('Carrito', schema);
