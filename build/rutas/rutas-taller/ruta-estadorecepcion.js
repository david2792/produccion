"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Estadosorentrabajos_1 = require("../../controladores/referenciales-taller/Estadosorentrabajos");
const express_1 = require("express");
class EstadoRecepcionRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', Estadosorentrabajos_1.estadoTrabajoControlador.listar);
        this.router.post('/', Estadosorentrabajos_1.estadoTrabajoControlador.crear);
        this.router.put('/', Estadosorentrabajos_1.estadoTrabajoControlador.actualizar);
    }
}
const estdoTrabajoRutas = new EstadoRecepcionRutas();
exports.default = estdoTrabajoRutas.router;
