"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_1 = require("../../controladores/referenciales-productos/categoria");
class CategoriaRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', categoria_1.categoriaControlador.listar);
        //    this.router.get('/:id',categoriaControlador.listarUno);
        this.router.post('/', categoria_1.categoriaControlador.crear);
        this.router.delete('/', categoria_1.categoriaControlador.eliminar);
        this.router.put('/', categoria_1.categoriaControlador.actualiar);
    }
}
const categoriaRutas = new CategoriaRutas();
exports.default = categoriaRutas.router;
