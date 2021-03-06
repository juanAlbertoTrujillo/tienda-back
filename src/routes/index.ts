import {Router} from 'express';
import {agregarArticulo, obtenerArticulos} from '../controller/articulo.controller';
import {agregarUsuario, iniciarSesion, cerrarSesion} from '../controller/usuarioController';
import {consultarCarrito, agregarArticuloCarrito, eliminarArticuloCarrito, actualizarArticuloCarrito} from '../controller/carrito.controller'

const router = Router();

router.route('/articulo')
    .post(agregarArticulo)
    .get(obtenerArticulos)

router.route('/usuarior')
    .post(agregarUsuario)

router.route('/usuarioi')
    .post(iniciarSesion)

router.route('/usuarioc')
    .post(cerrarSesion)

router.route('/carrito')
    .post(agregarArticuloCarrito)
    .get(consultarCarrito)
    .put(actualizarArticuloCarrito)

router.route('/carritou')
    .post(consultarCarrito)

router.route('/carritod')
    .post(eliminarArticuloCarrito)

export default router;