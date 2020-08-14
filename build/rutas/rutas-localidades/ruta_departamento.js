"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamento_1 = require("../../controladores/referenciales-localidades/departamento");
class DepartamentoRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', departamento_1.departamentoControlador.listar);
        this.router.post('/', departamento_1.departamentoControlador.crear);
        this.router.put('/', departamento_1.departamentoControlador.actualizar);
    }
}
const departamentoRutas = new DepartamentoRutas();
exports.default = departamentoRutas.router;
