"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timbrado_1 = require("../../controladores/referenciales-facturas/timbrado");
class TimbradosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', timbrado_1.timbradoControlador.listarTimbrados);
        // this.router.get('/', timbradoControlador.recuperarCodigo)
    }
}
const timbradosRutas = new TimbradosRutas();
exports.default = timbradosRutas.router;
