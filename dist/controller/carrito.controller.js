"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carrito_1 = __importDefault(require("../models/Carrito"));
const v1_1 = __importDefault(require("uuid/v1"));
async function consultarCarrito(req, res) {
    return res.status(200).json(await Carrito_1.default.find());
}
exports.consultarCarrito = consultarCarrito;
async function agregarArticuloCarrito(req, res) {
    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    console.log(identificador);
    if (!identificador) {
        console.log('entra');
        identificador = v1_1.default();
    }
    const nuevoArticulo = {
        codigo,
        cantidad,
        usuario,
        identificador,
        titulo,
        descripcion,
        precio,
        categoria,
        imagenURL
    };
    const carrito = new Carrito_1.default(nuevoArticulo);
    await carrito.save();
    console.log(carrito);
    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        carrito
    });
}
exports.agregarArticuloCarrito = agregarArticuloCarrito;
async function eliminarArticuloCarrito(req, res) {
    const { codigo, usuario } = req.body;
    const eliminado = await Carrito_1.default.findOneAndRemove({
        codigo,
        usuario
    });
    return res.status(200).json({
        mensaje: 'Articulo eliminado del carrito',
        eliminado
    });
}
exports.eliminarArticuloCarrito = eliminarArticuloCarrito;
async function actualizarArticuloCarrito(req, res) {
    const { codigo, usuario, cantidad } = req.body;
    const actualizado = await Carrito_1.default.findOneAndUpdate({
        codigo,
        usuario
    }, {
        cantidad
    }, {
        new: true
    });
    return res.status(200).json({
        mensaje: 'Articulo actualizado',
        actualizado
    });
}
exports.actualizarArticuloCarrito = actualizarArticuloCarrito;
