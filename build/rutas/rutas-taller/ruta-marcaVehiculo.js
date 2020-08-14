"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcaVehiculo_1 = require("../../controladores/referenciales-taller/marcaVehiculo");
class MarcaVechiculoRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', marcaVehiculo_1.marcasVehiculosControlador.listar);
        this.router.post('/', marcaVehiculo_1.marcasVehiculosControlador.crear);
        this.router.put('/', marcaVehiculo_1.marcasVehiculosControlador.actualizar);
    }
}
const marcaVechiculoRutas = new MarcaVechiculoRutas();
exports.default = marcaVechiculoRutas.router;
