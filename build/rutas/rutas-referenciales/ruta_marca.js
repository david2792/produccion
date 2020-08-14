"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marca_1 = require("../../controladores/referenciales-productos/marca");
class MarcaRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', marca_1.marcasControlador.listar);
        //    this.router.get('/',marcasControlador.listarUno);
        this.router.post('/', marca_1.marcasControlador.crear);
        this.router.delete('/', marca_1.marcasControlador.eliminar);
        this.router.put('/', marca_1.marcasControlador.actualiar);
    }
}
const marcasRutas = new MarcaRutas();
exports.default = marcasRutas.router;
