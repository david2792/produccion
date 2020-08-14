"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const familia_1 = require("../../controladores/referenciales-productos/familia");
class FamiliarRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', familia_1.familiaControlador.listar);
        this.router.get('/:id', familia_1.familiaControlador.listarUno);
        this.router.post('/', familia_1.familiaControlador.crear);
        this.router.delete('/:id', familia_1.familiaControlador.eliminar);
        this.router.put('/:id', familia_1.familiaControlador.actualiar);
    }
}
const familiaRutas = new FamiliarRutas();
exports.default = familiaRutas.router;
