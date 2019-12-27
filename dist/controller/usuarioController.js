"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../models/Usuario"));
const carrito_controller_1 = require("./carrito.controller");
const Query_1 = require("../models/Query");
/**
 * Metodo para virificar si los datos ingresados al iniciar sesion son correctos
 * @param req
 * @param res
 */
async function iniciarSesion(req, res) {
    let estadoM = 0;
    let mensajeM = '';
    const { usuario, contrasena } = req.body;
    let user = await Query_1.buscarUno(Usuario_1.default, { usuario });
    console.log(user);
    if (!user || user.contrasena != contrasena) {
        estadoM = 1;
        mensajeM = 'Datos incorrecotos';
    }
    else {
        user = await Query_1.actualizar(Usuario_1.default, { "_id": user._id }, { sesion: true }, { new: true });
        console.log(user);
    }
    carrito_controller_1.combinarCarrito(req.body);
    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    });
}
exports.iniciarSesion = iniciarSesion;
/**
 * Metodo para cambiar el valor de sesion a falso cuando se cierra sesion
 * @param req
 * @param res
 */
async function cerrarSesion(req, res) {
    let estadoM = 0;
    let mensajeM = '';
    const { _id } = req.body;
    console.log(req.body);
    const user = await Query_1.actualizar(Usuario_1.default, { _id }, { sesion: false }, { new: true });
    console.log(user);
    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    });
}
exports.cerrarSesion = cerrarSesion;
/**
 * Metodo para reguistrar nuevos usuarios en la base de datos
 * @param req
 * @param res
 */
async function agregarUsuario(req, res) {
    let estadoM = 0;
    let mensajeM = 'Usuario agregado';
    let guardarUsuario;
    try {
        const { usuario, contrasena } = req.body;
        const nuevoUsuario = {
            usuario,
            contrasena
        };
        guardarUsuario = new Usuario_1.default(nuevoUsuario);
        await Query_1.guardar(guardarUsuario);
    }
    catch (error) {
        estadoM = 1;
        mensajeM = 'Error al registrar informacion';
    }
    finally {
        return res.json({
            //agregar estado de clase codigosEstados
            mensaje: mensajeM,
            estado: estadoM,
            guardarUsuario
        });
    }
}
exports.agregarUsuario = agregarUsuario;
