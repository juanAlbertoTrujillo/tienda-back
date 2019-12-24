import {Request, Response} from 'express';
import Carrito from '../models/Carrito';
import uuidv1 from 'uuid/v1';

export async function consultarCarrito(req: Request, res: Response): Promise<Response> {
    console.log("consultarCarrito")
    console.log(req.body);
    let { usuario, identificador } = req.body;
    const carrito = await Carrito.find({ usuario, identificador })
    return res.status(200).json(carrito);
   
}

export async function agregarArticuloCarrito(req: Request, res: Response): Promise<Response> {

    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    let respuesta;
    
    if( identificador === undefined){
        console.log('entra')
        identificador = uuidv1();
    }

    const carrito = await Carrito.findOne({
        identificador,
        codigo
    }).lean();

    if (carrito) {
        
        console.log(carrito)
        cantidad = carrito.cantidad +1;
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

export async function combinarCarrito(articulos: any) {

    console.log('<<<<<<<<<<<<<<<<<<<<<<<combinarCarrito>>>>>>>>>>>>>>>>>>>>>>>')
    const { _id, cantidad, identificador, codigo, usuario } = articulos;
    const carrito = await Carrito.find({ usuario:null, identificador })
    console.log(carrito);

    for (let articulo of carrito) {
        console.log('dentro del for')
        console.log(articulo)
        console.log('-----------------------------------------')
        console.log(JSON.stringify(cantidad))
        console.log('-----------------------------------------')
        console.log(articulo.toJSON)
        //const codigoSinUsuario = articulo.codigo;

        // const coincidencia =  await Carrito.findOneAndUpdate(
        //     {
        //         usuario,
        //         identificador,
        //         codigo
        //     },
        //     {
        //         cantidad 
        //     },{
        //         new: true
        //     });
      }
    
}