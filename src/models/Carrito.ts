import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    categoria: Number,
    codigo: Number,
    imagenURL: String,
    cantidad: {
        type: Number, default: 1 
    },
    usuario: {
        type: String, default: null 
    },
    identificador: String
});

interface ICarrito extends Document{
    codigo: number,
    cantidad: number,
    usuario: string,
    identificador: string
}

export default model<ICarrito>('Carrito', schema);