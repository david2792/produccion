"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traccion_1 = require("./../../controladores/referenciales-taller/traccion");
const express_1 = require("express");
traccion_1.traccionesControlador;
class TraccionRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', traccion_1.traccionesControlador.listar);
        this.router.post('/', traccion_1.traccionesControlador.crear);
        this.router.put('/', traccion_1.traccionesControlador.actualizar);
    }
}
const traccionRuta = new TraccionRuta();
exports.default = traccionRuta.router;
