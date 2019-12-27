"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function buscarMasDeUno(modelo, filtro = {}) {
    console.log("buscarMasDeUno");
    console.log(filtro);
    console.log(typeof (modelo));
    console.log(typeof (filtro));
    // const busqueda = await modelo.find(filtro)
    return await modelo.find(filtro).lean();
}
exports.buscarMasDeUno = buscarMasDeUno;
async function buscarUno(modelo, filtro = {}) {
    console.log("buscarUno");
    console.log(filtro);
    // const busqueda = await modelo.find(filtro)
    return await modelo.findOne(filtro).lean();
}
exports.buscarUno = buscarUno;
async function guardar(modelo) {
    console.log("guardar");
    return await modelo.save();
}
exports.guardar = guardar;
async function actualizar(modelo, filtro, camposNuevos, opciones = {}) {
    console.log("actualizar");
    console.log(filtro);
    return await modelo.findOneAndUpdate(filtro, camposNuevos, opciones);
}
exports.actualizar = actualizar;
async function eliminar(modelo, filtro) {
    console.log("eliminar");
    console.log(filtro);
    return await modelo.findOneAndRemove(filtro);
}
exports.eliminar = eliminar;
