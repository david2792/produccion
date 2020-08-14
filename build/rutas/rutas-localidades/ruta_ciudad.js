"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ciudad_1 = require("../../controladores/referenciales-localidades/ciudad");
class CiudadRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ciudad_1.ciudadesControlador.listar);
        this.router.post('/', ciudad_1.ciudadesControlador.crear);
        this.router.put('/', ciudad_1.ciudadesControlador.actualizar);
    }
}
const ciudadRutas = new CiudadRutas();
exports.default = ciudadRutas.router;
