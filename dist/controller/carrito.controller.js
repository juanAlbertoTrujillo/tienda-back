"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("../models/Query");
const Carrito_1 = __importDefault(require("../models/Carrito"));
const v1_1 = __importDefault(require("uuid/v1"));
/**
 * Metodo para consultar los articulos agregados al carrito
 * @param req
 * @param res
 */
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
/**
 * Metodo para agregar nuevos elementos al carrito.
 * Si el articulo ya existe en el carrito se sumara al existente
 * @param req
 * @param res
 */
async function agregarArticuloCarrito(req, res) {
    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    let respuesta;
    let filtro = {};
    if (identificador === undefined) {
        console.log('entra');
        identificador = v1_1.default();
    }
    filtro = {
        identificador,
        codigo,
        usuario
    };
    const carrito = await Query_1.buscarUno(Carrito_1.default, filtro);
    if (carrito) {
        console.log(carrito);
        cantidad = carrito.cantidad + 1;
        filtro = {
            identificador,
            codigo,
            usuario
        };
        let campos = {
            cantidad
        };
        respuesta = await Query_1.actualizar(Carrito_1.default, filtro, campos, { new: true });
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
        respuesta = await Query_1.guardar(carrito);
    }
    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        respuesta
    });
}
exports.agregarArticuloCarrito = agregarArticuloCarrito;
/**
 * Metodo para eliminar articulos en el carrito.
 * @param req
 * @param res
 */
async function eliminarArticuloCarrito(req, res) {
    const { codigo, usuario, identificador, _id } = req.body;
    console.log('eliminarArticuloCarrito');
    const eliminado = await Query_1.eliminar(Carrito_1.default, { _id });
    return res.status(200).json({
        mensaje: 'Articulo eliminado del carrito',
        eliminado
    });
}
exports.eliminarArticuloCarrito = eliminarArticuloCarrito;
/**
 * Metodo para actualizar la cantidad de un articulo en el carrito
 * @param req
 * @param res
 */
async function actualizarArticuloCarrito(req, res) {
    const { _id, cantidad, identificador, codigo, usuario } = req.body;
    const actualizado = await Query_1.actualizar(Carrito_1.default, { identificador, codigo }, { cantidad }, { new: true });
    return res.status(200).json({
        mensaje: 'Articulo actualizado',
        actualizado
    });
}
exports.actualizarArticuloCarrito = actualizarArticuloCarrito;
/**
 * Metodo encargado de combinar los articulos de un carrito sin hacer loggin con los existentes en la cuenta de un usuario
 * @param articulos articulos que se sombinaran con la cuenta de un usuario
 */
async function combinarCarrito(articulos) {
    const { _id, cantidad, identificador, codigo, usuario } = articulos;
    let cantidadNueva;
    const carrito = await Query_1.buscarMasDeUno(Carrito_1.default, { usuario: null, identificador });
    console.log(carrito);
    for (let articulo of carrito) {
        const codigoSinUsuario = articulo.codigo;
        const obtenerCantidad = await Query_1.buscarUno(Carrito_1.default, { usuario, identificador, codigo: codigoSinUsuario });
        if (obtenerCantidad) {
            cantidadNueva = articulo.cantidad + obtenerCantidad.cantidad;
            const eliminado = await Query_1.eliminar(Carrito_1.default, { uduario: null, identificador, codigo: codigoSinUsuario });
        }
        else {
            cantidadNueva = articulo.cantidad;
        }
        await Query_1.actualizar(Carrito_1.default, { identificador, codigo: codigoSinUsuario }, { cantidad: cantidadNueva, usuario });
    }
}
exports.combinarCarrito = combinarCarrito;
