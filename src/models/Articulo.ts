import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    categoria: Number,
    codigo: Number,
    imagenURL: String
});

interface IArticulo extends Document{
    titulo: string;
    descripcion: string;
    precio: number;
    categoria: number;
    codigo: number,
    imagenURL: string;
}

export default model<IArticulo>('Articulo', schema);