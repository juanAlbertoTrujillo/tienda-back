
export async function buscarMasDeUno(modelo: any, filtro: Object = {}): Promise<any> {
    console.log("buscarMasDeUno")
    console.log(filtro);
    console.log('modelo')
    console.log(typeof(modelo))
    console.log('filtro')
    console.log(typeof(filtro))
    // const busqueda = await modelo.find(filtro)
    return await modelo.find(filtro).lean();
   
}
export async function buscarUno(modelo: any, filtro: Object = {}): Promise<any> {
    console.log("buscarUno")
    console.log(filtro);
    // const busqueda = await modelo.find(filtro)
    return await modelo.findOne(filtro).lean();
   
}

export async function guardar(modelo: any): Promise<any> {
    console.log("guardar")
    return await modelo.save();
}

export async function actualizar(modelo: any, filtro: Object, camposNuevos: Object, opciones: Object = {}): Promise<any> {
    console.log("actualizar")
    console.log(filtro);

    return await modelo.findOneAndUpdate(filtro, camposNuevos, opciones);
}

export async function eliminar(modelo: any, filtro: Object): Promise<any> {
    console.log("eliminar")
    console.log(filtro);
    return await modelo.findOneAndRemove(filtro);
}