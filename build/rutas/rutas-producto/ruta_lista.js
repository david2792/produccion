"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listaPrecio_1 = require("../../controladores/productos/listaPrecio");
class ListaPrecioRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/', listaPrecio_1.listaPrecioControlador.anular);
        this.router.put('/actualizar', listaPrecio_1.listaPrecioControlador.actualizar);
        this.router.get('/:id', listaPrecio_1.listaPrecioControlador.listarUno);
        this.router.post('/', listaPrecio_1.listaPrecioControlador.crear);
    }
}
const listaPrecioRutas = new ListaPrecioRutas();
exports.default = listaPrecioRutas.router;
