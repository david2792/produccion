"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_1 = require("../../controladores/clientes/cliente");
class ClientesRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', cliente_1.controladorCliente.listar);
        this.router.post('/', cliente_1.controladorCliente.crear);
        this.router.put('/', cliente_1.controladorCliente.actualizar);
    }
}
const clienteRutas = new ClientesRutas();
exports.default = clienteRutas.router;
