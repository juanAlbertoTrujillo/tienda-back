import { Request, Response } from 'express';
import Articulo from '../models/Articulo';
import { buscarMasDeUno, guardar } from '../models/Query'

/**
 * Metodo para obtener todos los articulos en la tienda
 * @param req 
 * @param res 
 */
export async function obtenerArticulos(req: Request, res: Response): Promise<Response> {
    return res.status(200).json(await buscarMasDeUno(Articulo));
}


/**
 * Metodo para agregar nuevos articulos a la tienda
 * @param req 
 * @param res 
 */
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
    await guardar(articulo);

    return res.status(200).json({
        mensaje: 'Articulo agregado',
        articulo
    })
}