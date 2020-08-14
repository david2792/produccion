"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tipoTransmision_1 = require("./../../controladores/referenciales-taller/tipoTransmision");
const express_1 = require("express");
class TipoTransmicionRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipoTransmision_1.tiposTransmisionControlador.listar);
        this.router.post('/', tipoTransmision_1.tiposTransmisionControlador.crear);
        this.router.put('/', tipoTransmision_1.tiposTransmisionControlador.actualizar);
    }
}
const tipoTransmicionRutas = new TipoTransmicionRutas();
exports.default = tipoTransmicionRutas.router;
