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
    let respuesta;
    console.log('identificador1111111111111111111');
    console.log(identificador);
    console.log(identificador === 'undefined');
    console.log(identificador === undefined);
    if (identificador === 'undefined') {
        console.log('entra');
        identificador = v1_1.default();
    }
    console.log('identificador2');
    console.log(identificador);
    const carrito = await Carrito_1.default.findOne({
        identificador,
        codigo
    }).lean();
    console.log('<<<<<<<findOOOOOOOOOOOOOOOOOOOOOOOOOne>>>>>>>');
    console.log(carrito);
    if (carrito) {
        console.log(carrito);
        cantidad = carrito.cantidad + 1;
        console.log('<<<<<<<<<<<<<<<<<<<<<find>>>>>>>>>>>>>>>>>>>>>');
        respuesta = await Carrito_1.default.findOneAndUpdate({
            identificador,
            codigo
        }, {
            cantidad
        }, {
            new: true
        });
    }
    else {
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
        respuesta = await carrito.save();
    }
    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        respuesta
    });
}
exports.agregarArticuloCarrito = agregarArticuloCarrito;
async function eliminarArticuloCarrito(req, res) {
    const { codigo, usuario, identificador, _id } = req.body;
    console.log('req');
    console.log(req.body);
    console.log(_id);
    console.log('req params');
    console.log(req.params);
    const eliminado = await Carrito_1.default.findOneAndRemove({
        _id
    });
    return res.status(200).json({
        mensaje: 'Articulo eliminado del carrito',
        eliminado
    });
}
exports.eliminarArticuloCarrito = eliminarArticuloCarrito;
async function actualizarArticuloCarrito(req, res) {
    const { _id, cantidad, identificador, codigo, usuario } = req.body;
    const actualizado = await Carrito_1.default.findOneAndUpdate({
        identificador,
        codigo
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
