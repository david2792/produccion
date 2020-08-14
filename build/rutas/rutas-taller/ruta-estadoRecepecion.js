"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadoRecepcion_1 = require("../../controladores/referenciales-taller/estadoRecepcion");
class EstadoRecepcionRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', estadoRecepcion_1.estadoRecepcionControlador.listar);
        this.router.post('/', estadoRecepcion_1.estadoRecepcionControlador.crear);
        this.router.put('/', estadoRecepcion_1.estadoRecepcionControlador.actualizar);
    }
}
const estadoRecepcionRutas = new EstadoRecepcionRutas();
exports.default = estadoRecepcionRutas.router;
