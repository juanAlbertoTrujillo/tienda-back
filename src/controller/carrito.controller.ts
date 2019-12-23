import {Request, Response} from 'express';
import Carrito from '../models/Carrito';
import uuidv1 from 'uuid/v1';

export async function consultarCarrito(req: Request, res: Response): Promise<Response> {
    return res.status(200).json( await Carrito.find());
   
}

export async function agregarArticuloCarrito(req: Request, res: Response): Promise<Response> {

    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    let respuesta;
    
    console.log('identificador1111111111111111111')
    console.log(identificador)
    console.log(identificador === 'undefined')
    console.log(identificador === undefined)
    if( identificador === 'undefined'){
        console.log('entra')
        identificador = uuidv1();
    }
    console.log('identificador2')
    console.log(identificador)

    const carrito = await Carrito.findOne({
        identificador,
        codigo
    }).lean();
    console.log('<<<<<<<findOOOOOOOOOOOOOOOOOOOOOOOOOne>>>>>>>')
    console.log(carrito)
    if (carrito) {
        
        console.log(carrito)
        cantidad = carrito.cantidad +1;
        console.log('<<<<<<<<<<<<<<<<<<<<<find>>>>>>>>>>>>>>>>>>>>>')
        respuesta = await Carrito.findOneAndUpdate(
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
        respuesta = await carrito.save();
    } 

    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        respuesta
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