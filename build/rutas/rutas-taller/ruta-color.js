"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colores_1 = require("../../controladores/referenciales-taller/colores");
class ColorRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', colores_1.coloresControlador.listar);
        this.router.post('/', colores_1.coloresControlador.crear);
        this.router.put('/', colores_1.coloresControlador.actualizar);
    }
}
const colorRutas = new ColorRutas();
exports.default = colorRutas.router;
