import {Request, Response} from 'express';
import Carrito from '../models/Carrito';
import uuidv1 from 'uuid/v1';

export async function consultarCarrito(req: Request, res: Response): Promise<Response> {
    return res.status(200).json( await Carrito.find());
   
}

export async function agregarArticuloCarrito(req: Request, res: Response): Promise<Response> {

    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;

    const carrito = await Carrito.find({
        identificador,
        codigo
    }).lean();
    if (carrito.length >= 1) {
        cantidad = carrito[1];
        console.log(carrito)
        console.log('<<<<<<<<<<<<<<<<<<<cantidad>>>>>>>>>>>>>>>>>>>')
        console.log(carrito[1])
        console.log(carrito[0].cantidad)
        console.log('<<<<<<<<<<<<<<<<<<<<<find>>>>>>>>>>>>>>>>>>>>>')
        const actualizado = await Carrito.findOneAndUpdate(
            {
                identificador,
                codigo
            },
            {
                cantidad
            },{
                new: true
            });
    } else{
        console.log(identificador)
        if( !identificador ){
            console.log('entra')
            identificador = uuidv1();
        }
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
        await carrito.save();
        console.log(carrito);
    } 

    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        carrito
    })
}

export async function eliminarArticuloCarrito(req: Request, res: Response): Promise<Response> {
    
    const { codigo, usuario, identificador, _id } = req.body;
    console.log('req')
    console.log(req.body)
    console.log(_id)
    console.log('req params')
    console.log(req.params)
    const eliminado = await Carrito.findOneAndRemove({
        _id
    });
    return res.status(200).json({
        mensaje: 'Articulo eliminado del carrito',
        eliminado
    })
}

export async function actualizarArticuloCarrito(req: Request, res: Response): Promise<Response> {

    const { _id, cantidad, identificador, codigo, usuario } = req.body;
    const actualizado = await Carrito.findOneAndUpdate(
    {
        identificador,
        codigo
    },
    {
        cantidad
    },{
        new: true
    });
    return res.status(200).json({
        mensaje: 'Articulo actualizado',
        actualizado
    })
}