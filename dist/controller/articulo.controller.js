"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Articulo_1 = __importDefault(require("../models/Articulo"));
async function obtenerArticulos(req, res) {
    return res.status(200).json(await Articulo_1.default.find());
}
exports.obtenerArticulos = obtenerArticulos;
async function agregarArticulo(req, res) {
    const { titulo, descripcion, precio, categoria, codigo, imagenURL } = req.body;
    const nuevoArticulo = {
        titulo,
        descripcion,
        precio,
        categoria,
        codigo,
        imagenURL
    };
    const articulo = new Articulo_1.default(nuevoArticulo);
    await articulo.save();
    return res.status(200).json({
        mensaje: 'Articulo agregado',
        articulo
    });
}
exports.agregarArticulo = agregarArticulo;
