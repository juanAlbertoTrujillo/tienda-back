import {Schema, model, Document, VirtualType} from 'mongoose';

const schemaUsuario = new Schema({
    usuario: String,
    contrasena: String,
    sesion: { type: Boolean, default: false }

});

interface IUsuario extends Document{
    usuario: string,
    contrasena: string,
    sesion: boolean
}

export default model<IUsuario>('Usuario', schemaUsuario);