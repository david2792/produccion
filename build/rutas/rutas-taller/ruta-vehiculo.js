"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehiculo_1 = require("./../../controladores/referenciales-taller/vehiculo");
const express_1 = require("express");
class VehiculoRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', vehiculo_1.vehiculoControlador.listar);
        this.router.post('/', vehiculo_1.vehiculoControlador.crear);
        //    this.router.put('/',traccionesControlador.actualizar);
    }
}
const vehiculoRuta = new VehiculoRuta();
exports.default = vehiculoRuta.router;
