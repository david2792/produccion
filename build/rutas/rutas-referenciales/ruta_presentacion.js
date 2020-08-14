"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const presentaciones_1 = require("../../controladores/referenciales-productos/presentaciones");
class PresentacionRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', presentaciones_1.presentacionControlador.listar);
        this.router.get('/:id', presentaciones_1.presentacionControlador.listarUno);
        this.router.post('/', presentaciones_1.presentacionControlador.crear);
        this.router.delete('/:id', presentaciones_1.presentacionControlador.eliminar);
        this.router.put('/:id', presentaciones_1.presentacionControlador.actualiar);
    }
}
const presentacionRutas = new PresentacionRutas();
exports.default = presentacionRutas.router;
