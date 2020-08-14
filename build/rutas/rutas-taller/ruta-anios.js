"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const anio_1 = require("../../controladores/referenciales-taller/anio");
class AniosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', anio_1.aniosControlador.listar);
        this.router.post('/', anio_1.aniosControlador.crear);
        this.router.put('/', anio_1.aniosControlador.actualizar);
    }
}
const aniosRutas = new AniosRutas();
exports.default = aniosRutas.router;
