"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carrito_1 = __importDefault(require("../models/Carrito"));
const v1_1 = __importDefault(require("uuid/v1"));
async function consultarCarrito(req, res) {
    console.log("consultarCarrito");
    console.log(req.body);
    let { usuario, identificador } = req.body;
    const carrito = await Carrito_1.default.find({ usuario, identificador });
    return res.status(200).json(carrito);
}
exports.consultarCarrito = consultarCarrito;
async function agregarArticuloCarrito(req, res) {
    let { codigo, cantidad, usuario, identificador, titulo, descripcion, precio, categoria, imagenURL } = req.body;
    let respuesta;
    if (identificador === undefined) {
        console.log('entra');
        identificador = v1_1.default();
    }
    const carrito = await Carrito_1.default.findOne({
        identificador,
        codigo
    }).lean();
    if (carrito) {
        console.log(carrito);
        cantidad = carrito.cantidad + 1;
        respuesta = await Carrito_1.default.findOneAndUpdate({
            identificador,
            codigo
        }, {
            cantidad
        }, {
            new: true
        });
    }
    else {
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
        const carrito = new Carrito_1.default(nuevoArticulo);
        respuesta = await carrito.save();
    }
    return res.status(200).json({
        mensaje: 'Articulo agregado al carrito',
        respuesta
    });
}
exports.agregarArticuloCarrito = agregarArticuloCarrito;
async function eliminarArticuloCarrito(req, res) {
    const { codigo, usuario, identificador, _id } = req.body;
    console.log('req');
    console.log(req.body);
    console.log(_id);
    console.log('req params');
    console.log(req.params);
    const eliminado = await Carrito_1.default.findOneAndRemove({
        _id
    });
    return res.status(200).json({
        mensaje: 'Articulo eliminado del carrito',
        eliminado
    });
}
exports.eliminarArticuloCarrito = eliminarArticuloCarrito;
async function actualizarArticuloCarrito(req, res) {
    const { _id, cantidad, identificador, codigo, usuario } = req.body;
    const actualizado = await Carrito_1.default.findOneAndUpdate({
        identificador,
        codigo
    }, {
        cantidad
    }, {
        new: true
    });
    return res.status(200).json({
        mensaje: 'Articulo actualizado',
        actualizado
    });
}
exports.actualizarArticuloCarrito = actualizarArticuloCarrito;
async function combinarCarrito(articulos) {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<combinarCarrito>>>>>>>>>>>>>>>>>>>>>>>');
    const { _id, cantidad, identificador, codigo, usuario } = articulos;
    const carrito = await Carrito_1.default.find({ usuario: null, identificador });
    console.log(carrito);
    for (let articulo of carrito) {
        console.log('dentro del for');
        console.log(articulo);
        console.log('-----------------------------------------');
        console.log(JSON.stringify(cantidad));
        console.log('-----------------------------------------');
        console.log(articulo.toJSON);
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
exports.combinarCarrito = combinarCarrito;
