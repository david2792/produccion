"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const unidadMedida_1 = require("../../controladores/referenciales-productos/unidadMedida");
class MedidasRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', unidadMedida_1.medidasControlador.listar);
        //     this.router.get('/:id',medidasControlador.listarUno);
        this.router.post('/', unidadMedida_1.medidasControlador.crear);
        this.router.delete('/', unidadMedida_1.medidasControlador.eliminar);
        this.router.put('/', unidadMedida_1.medidasControlador.actualiar);
    }
}
const medidasRutas = new MedidasRutas();
exports.default = medidasRutas.router;
