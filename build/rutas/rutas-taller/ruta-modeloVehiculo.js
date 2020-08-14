"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modeloVehiculo_1 = require("./../../controladores/referenciales-taller/modeloVehiculo");
const express_1 = require("express");
class ModeloVehiculoRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', modeloVehiculo_1.modelosVehiculosControlador.listar);
        this.router.post('/', modeloVehiculo_1.modelosVehiculosControlador.crear);
        this.router.put('/', modeloVehiculo_1.modelosVehiculosControlador.actualizar);
    }
}
const modeloVehiculoRuta = new ModeloVehiculoRuta();
exports.default = modeloVehiculoRuta.router;
