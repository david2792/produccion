"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recepcionVehiculo_1 = require("./../../controladores/referenciales-taller/recepcionVehiculo");
const express_1 = require("express");
class RecepcionVehiculoRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:id', recepcionVehiculo_1.recepcionvehiculoControlador.listar);
        this.router.get('/', recepcionVehiculo_1.recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/', recepcionVehiculo_1.recepcionvehiculoControlador.guardar);
        //    this.router.put('/',traccionesControlador.actualizar);
    }
}
const recepcionVehiculoRuta = new RecepcionVehiculoRuta();
exports.default = recepcionVehiculoRuta.router;
