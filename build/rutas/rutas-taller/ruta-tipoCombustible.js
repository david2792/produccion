"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tipoCombustible_1 = require("../../controladores/referenciales-taller/tipoCombustible");
const express_1 = require("express");
class TipoCombustibleRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipoCombustible_1.tipoCombustibleControlador.listar);
        this.router.post('/', tipoCombustible_1.tipoCombustibleControlador.crear);
        this.router.put('/', tipoCombustible_1.tipoCombustibleControlador.actualizar);
    }
}
const tipoCombustibleRutas = new TipoCombustibleRutas();
exports.default = tipoCombustibleRutas.router;
