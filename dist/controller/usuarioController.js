"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../models/Usuario"));
async function iniciarSesion(req, res) {
    let estadoM = 0;
    let mensajeM = '';
    const { usuario, contrasena } = req.body;
    let user = await Usuario_1.default.findOne({ usuario });
    console.log(user);
    if (!user || user.contrasena != contrasena) {
        estadoM = 1;
        mensajeM = 'Datos incorrecotos';
    }
    else {
        user = await Usuario_1.default.findOneAndUpdate({ "_id": user._id }, {
            sesion: true
        }, {
            new: true
        });
        console.log(user);
    }
    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    });
}
exports.iniciarSesion = iniciarSesion;
async function cerrarSesion(req, res) {
    let estadoM = 0;
    let mensajeM = '';
    const { _id } = req.body;
    console.log(req.body);
    const user = await Usuario_1.default.findOneAndUpdate({ "_id": _id }, {
        sesion: false
    }, {
        new: true
    });
    console.log(user);
    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    });
}
exports.cerrarSesion = cerrarSesion;
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
        await guardarUsuario.save();
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
