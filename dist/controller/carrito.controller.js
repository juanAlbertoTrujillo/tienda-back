"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("../models/Query");
const Carrito_1 = __importDefault(require("../models/Carrito"));
const v1_1 = __importDefault(require("uuid/v1"));
async function consultarCarrito(req, res) {
    console.log("consultarCarrito");
    console.log(req.body);
    let { usuario, identificador } = req.body;
    let filtro = {
        usuario,
        identificador
    };
    return res.status(200).json(await Query_1.buscarMasDeUno(Carrito_1.default, filtro));
}
exports.consultarCarrito = consultarCarrito;
async function agregarArticuloCarrito(req, res) {
    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    let respuesta;
    if (identificador === undefined) {
        console.log('entra');
        identificador = v1_1.default();
    }
    const carrito = await Carrito_1.default.findOne({
        identificador,
        codigo,
        usuario
    }).lean();
    if (carrito) {
        console.log(carrito);
        cantidad = carrito.cantidad + 1;
        respuesta = await Carrito_1.default.findOneAndUpdate({
            identificador,
            codigo,
            usuario
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
async function combinarCarrito(articulos) {
    const { _id, cantidad, identificador, codigo, usuario } = articulos;
    let cantidadNueva;
    const carrito = await Carrito_1.default.find({ usuario: null, identificador }).lean();
    console.log(carrito);
    for (let articulo of carrito) {
        const codigoSinUsuario = articulo.codigo;
        const obtenerCantidad = await Carrito_1.default.findOne({
            usuario,
            identificador,
            codigo: codigoSinUsuario
        }).lean();
        if (obtenerCantidad) {
            cantidadNueva = articulo.cantidad + obtenerCantidad.cantidad;
            const eliminado = await Carrito_1.default.findOneAndRemove({
                uduario: null,
                identificador,
                codigo: codigoSinUsuario
            });
        }
        else {
            cantidadNueva = articulo.cantidad;
        }
        const coincidencia = await Carrito_1.default.updateOne({
            identificador,
            codigo: codigoSinUsuario
        }, {
            cantidad: cantidadNueva,
            usuario
        });
    }
}
exports.combinarCarrito = combinarCarrito;
