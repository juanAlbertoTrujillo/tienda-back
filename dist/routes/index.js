"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulo_controller_1 = require("../controller/articulo.controller");
const usuarioController_1 = require("../controller/usuarioController");
const carrito_controller_1 = require("../controller/carrito.controller");
const router = express_1.Router();
router.route('/articulo')
    .post(articulo_controller_1.agregarArticulo)
    .get(articulo_controller_1.obtenerArticulos);
router.route('/usuarior')
    .post(usuarioController_1.agregarUsuario);
router.route('/usuarioi')
    .post(usuarioController_1.iniciarSesion);
router.route('/usuarioc')
    .post(usuarioController_1.cerrarSesion);
router.route('/carrito')
    .post(carrito_controller_1.agregarArticuloCarrito)
    .get(carrito_controller_1.consultarCarrito)
    .delete(carrito_controller_1.eliminarArticuloCarrito)
    .put(carrito_controller_1.actualizarArticuloCarrito);
exports.default = router;
