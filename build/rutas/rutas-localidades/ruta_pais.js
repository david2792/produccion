"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pais_1 = require("../../controladores/referenciales-localidades/pais");
class PaisesRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', pais_1.paisControlador.listar);
        this.router.post('/', pais_1.paisControlador.crear);
        this.router.put('/', pais_1.paisControlador.actualizar);
    }
}
const paisesRutas = new PaisesRutas();
exports.default = paisesRutas.router;
