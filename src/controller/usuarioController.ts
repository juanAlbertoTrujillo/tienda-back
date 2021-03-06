import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import { combinarCarrito } from './carrito.controller';
import { buscarUno, actualizar, guardar } from '../models/Query'

/**
 * Metodo para virificar si los datos ingresados al iniciar sesion son correctos
 * @param req 
 * @param res 
 */
export async function iniciarSesion(req: Request, res: Response): Promise<Response> {
    let estadoM: number = 0;
    let mensajeM: string = '';
    const { usuario, contrasena } = req.body;
    let user = await buscarUno(Usuario, { usuario })
    console.log(user)
    if (!user || user.contrasena != contrasena){
        estadoM = 1;
        mensajeM = 'Datos incorrecotos';
    }else{
        user = await actualizar(Usuario, {"_id":user._id}, { sesion: true },{ new: true })
        console.log(user)
    }
    combinarCarrito(req.body);

    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    })
} 

/**
 * Metodo para cambiar el valor de sesion a falso cuando se cierra sesion
 * @param req 
 * @param res 
 */
export async function cerrarSesion(req: Request, res: Response): Promise<Response> {
    let estadoM: number = 0;
    let mensajeM: string = '';
    const { _id } = req.body;
    console.log(req.body);
    const user = await actualizar(Usuario, {_id}, { sesion: false },{ new: true })
    console.log(user)

    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    })
} 

/**
 * Metodo para reguistrar nuevos usuarios en la base de datos
 * @param req 
 * @param res 
 */
export async function agregarUsuario(req: Request, res: Response): Promise<Response> {
    let estadoM: number = 0;
    let mensajeM: string = 'Usuario agregado';
    let guardarUsuario: any;
    try {
        const {usuario, contrasena} = req.body;
        const nuevoUsuario = {
            usuario,
            contrasena
        };

        guardarUsuario = new Usuario(nuevoUsuario);
        await guardar(guardarUsuario)
    } catch (error) {
        estadoM = 1;
        mensajeM = 'Error al registrar informacion'
    }finally {
        return res.json({
            //agregar estado de clase codigosEstados
            mensaje: mensajeM,
            estado: estadoM,
            guardarUsuario
        })
     }
}