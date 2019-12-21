import {Request, Response} from 'express';
import Usuario from '../models/Usuario';

export async function iniciarSesion(req: Request, res: Response): Promise<Response> {
    let estadoM: number = 0;
    let mensajeM: string = '';
    const { usuario, contrasena } = req.body;
    let user = await Usuario.findOne({ usuario })
    console.log(user)
    if (!user || user.contrasena != contrasena){
        estadoM = 1;
        mensajeM = 'Datos incorrecotos';
    }else{
        user = await Usuario.findOneAndUpdate({"_id":user._id}, {
            sesion: true
        },{
            new: true
        });
        console.log(user)
    }

    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    })
} 

export async function cerrarSesion(req: Request, res: Response): Promise<Response> {
    let estadoM: number = 0;
    let mensajeM: string = '';
    const { _id } = req.body;
    console.log(req.body);
    const user = await Usuario.findOneAndUpdate({"_id":_id}, {
        sesion: false
    },{
        new: true
    });
    console.log(user)

    return res.json({
        //agregar estado de clase codigosEstados
        mensaje: mensajeM,
        estado: estadoM,
        user
    })
} 

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
        await guardarUsuario.save();
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