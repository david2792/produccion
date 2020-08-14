"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const impuesto_1 = require("../../controladores/referenciales-productos/impuesto");
class ImpuestosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', impuesto_1.impuestoControlador.listar);
        this.router.get('/', impuesto_1.impuestoControlador.listarUno);
        this.router.post('/', impuesto_1.impuestoControlador.crear);
        this.router.delete('/', impuesto_1.impuestoControlador.eliminar);
        this.router.put('/', impuesto_1.impuestoControlador.actualiar);
    }
}
const impuestosRutas = new ImpuestosRutas();
exports.default = impuestosRutas.router;
