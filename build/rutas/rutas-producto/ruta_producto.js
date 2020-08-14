"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../../controladores/productos/producto");
class ProductosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/listar', producto_1.productoControlador.listar);
        this.router.get('/codigo', producto_1.productoControlador.recuperarCodigo);
        //  this.router.get('/]',productoControlador.listarCategoria);
        //  this.router.get('/]',productoControlador.listarMarcas);
        //  this.router.get('/]',productoControlador.listarDeposito);
        //  this.router.get('/unidades',productoControlador.listarMedida);
        //  this.router.get('/presentacion',productoControlador.listarPresentacion);
        //  this.router.get('/impuesto',productoControlador.listarImpuesto);
        //  this.router.get('/:id',productoControlador.listarUno);
        this.router.post('/add', producto_1.productoControlador.crear);
        //  this.router.delete('/:id',categoriaControlador.eliminar);
        this.router.put('/update', producto_1.productoControlador.actualizar);
    }
}
const productosRutas = new ProductosRutas();
exports.default = productosRutas.router;
