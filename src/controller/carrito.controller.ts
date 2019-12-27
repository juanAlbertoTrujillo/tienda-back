import {Request, Response} from 'express';
import { buscarUno, buscarMasDeUno, actualizar, guardar, eliminar } from '../models/Query'
import Carrito from '../models/Carrito';
import uuidv1 from 'uuid/v1';

/**
 * Metodo para consultar los articulos agregados al carrito
 * @param req 
 * @param res 
 */
export async function consultarCarrito(req: Request, res: Response): Promise<Response> {
    console.log("consultarCarrito")
    console.log(req.body);
    let { usuario, identificador } = req.body;
    let filtro = {
        usuario,
        identificador
    }

    return res.status(200).json(await buscarMasDeUno(Carrito, filtro));
   
}

/**
 * Metodo para agregar nuevos elementos al carrito.
 * Si el articulo ya existe en el carrito se sumara al existente
 * @param req 
 * @param res 
 */
export async function agregarArticuloCarrito(req: Request, res: Response): Promise<Response> {

    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    let respuesta;
    let filtro = {};
    
    if( identificador === undefined){
        console.log('entra')
        identificador = uuidv1();
    }

    filtro = {
        identificador,
        codigo,
        usuario
    }

    const carrito = await buscarUno(Carrito, filtro)

    if (carrito) {
        
        console.log(carrito)
        cantidad = carrito.cantidad +1;
        filtro = {
            identificador,
            codigo,
            usuario
        }

        let campos ={
            cantidad
        }
        respuesta = await actualizar(Carrito, filtro, campos, {new: true})

    } else{

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
        const carrito = new Carrito(nuevoArticulo);
        respuesta = await guardar(carrito);
    } 

    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        respuesta
    })
}

/**
 * Metodo para eliminar articulos en el carrito.
 * @param req 
 * @param res 
 */
export async function eliminarArticuloCarrito(req: Request, res: Response): Promise<Response> {
    
    const { codigo, usuario, identificador, _id } = req.body;
    console.log('eliminarArticuloCarrito')
    const eliminado = await eliminar(Carrito,{_id})
   
    return res.status(200).json({
        mensaje: 'Articulo eliminado del carrito',
        eliminado
    })
}

/**
 * Metodo para actualizar la cantidad de un articulo en el carrito
 * @param req 
 * @param res 
 */
export async function actualizarArticuloCarrito(req: Request, res: Response): Promise<Response> {

    const { _id, cantidad, identificador, codigo, usuario } = req.body;
    const actualizado = await actualizar(Carrito, {identificador,codigo}, {cantidad}, {new: true})

    return res.status(200).json({
        mensaje: 'Articulo actualizado',
        actualizado
    })
}

/**
 * Metodo encargado de combinar los articulos de un carrito sin hacer loggin con los existentes en la cuenta de un usuario
 * @param articulos articulos que se sombinaran con la cuenta de un usuario
 */
export async function combinarCarrito(articulos: any) {

    const { _id, cantidad, identificador, codigo, usuario } = articulos;
    let cantidadNueva;
    const carrito = await buscarMasDeUno(Carrito, { usuario:null, identificador })
    console.log(carrito);

    for (let articulo of carrito) {

        const codigoSinUsuario = articulo.codigo;
        const obtenerCantidad = await buscarUno(Carrito, { usuario, identificador, codigo: codigoSinUsuario })

        if (obtenerCantidad) {

            cantidadNueva = articulo.cantidad + obtenerCantidad.cantidad;
            const eliminado = await eliminar(Carrito, { uduario: null, identificador, codigo: codigoSinUsuario })

        } else {
            cantidadNueva = articulo.cantidad
        }

        await actualizar(Carrito, { identificador, codigo: codigoSinUsuario }, { cantidad: cantidadNueva, usuario })
      }
    
}