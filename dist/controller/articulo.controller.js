"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Articulo_1 = __importDefault(require("../models/Articulo"));
const Query_1 = require("../models/Query");
/**
 * Metodo para obtener todos los articulos en la tienda
 * @param req
 * @param res
 */
async function obtenerArticulos(req, res) {
    return res.status(200).json(await Query_1.buscarMasDeUno(Articulo_1.default));
}
exports.obtenerArticulos = obtenerArticulos;
/**
 * Metodo para agregar nuevos articulos a la tienda
 * @param req
 * @param res
 */
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
    await Query_1.guardar(articulo);
    return res.status(200).json({
        mensaje: 'Articulo agregado',
        articulo
    });
}
exports.agregarArticulo = agregarArticulo;
