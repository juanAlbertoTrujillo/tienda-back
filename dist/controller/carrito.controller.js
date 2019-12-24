"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carrito_1 = __importDefault(require("../models/Carrito"));
const v1_1 = __importDefault(require("uuid/v1"));
async function consultarCarrito(req, res) {
    console.log("consultarCarrito");
    console.log(req.body);
    let { usuario, identificador } = req.body;
    const carrito = await Carrito_1.default.find({ usuario, identificador });
    return res.status(200).json(carrito);
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
    console.log('<<<<<<<<<<<<<<<<<<<<<<<combinarCarrito>>>>>>>>>>>>>>>>>>>>>>>');
    const { _id, cantidad, identificador, codigo, usuario } = articulos;
    let cantidadNueva;
    const carrito = await Carrito_1.default.find({ usuario: null, identificador }).lean();
    console.log(carrito);
    for (let articulo of carrito) {
        console.log('dentro del for');
        console.log(articulo);
        const codigoSinUsuario = articulo.codigo;
        console.log('filtro');
        console.log(identificador);
        console.log(codigoSinUsuario);
        const obtenerCantidad = await Carrito_1.default.findOne({
            usuario,
            identificador,
            codigo: codigoSinUsuario
        }).lean();
        console.log('suma');
        if (obtenerCantidad) {
            console.log('entra if');
            cantidadNueva = articulo.cantidad + obtenerCantidad.cantidad;
        }
        else {
            console.log('else');
            cantidadNueva = articulo.cantidad;
        }
        console.log("antes del update");
        console.log('identificador');
        console.log(identificador);
        console.log('codigoSinUsuario');
        console.log(codigoSinUsuario);
        console.log('cantidadNueva');
        console.log(cantidadNueva);
        console.log('usuario');
        console.log(usuario);
        const coincidencia = await Carrito_1.default.findOneAndUpdate({
            identificador,
            codigo: codigoSinUsuario
        }, {
            cantidad: cantidadNueva,
            usuario
        }, {
            new: true
        });
        console.log('eliminar');
        const eliminado = await Carrito_1.default.findOneAndRemove({
            uduario: null,
            identificador,
            codigo: codigoSinUsuario
        });
    }
}
exports.combinarCarrito = combinarCarrito;
