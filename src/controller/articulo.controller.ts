import { Request, Response } from 'express';
import Articulo from '../models/Articulo';
import { buscarMasDeUno, guardar } from '../models/Query'

export async function obtenerArticulos(req: Request, res: Response): Promise<Response> {

    console.log(buscarMasDeUno(Articulo))

    return res.status(200).json(buscarMasDeUno(Articulo));
   
}

export async function agregarArticulo(req: Request, res: Response): Promise<Response> {

    const {titulo, descripcion, precio, categoria, codigo, imagenURL} = req.body;
    const nuevoArticulo = {
        titulo,
        descripcion,
        precio,
        categoria,
        codigo,
        imagenURL
    };
    const articulo = new Articulo(nuevoArticulo);
    await articulo.save();

    return res.status(200).json({
        mensaje: 'Articulo agregado',
        articulo
    })
}