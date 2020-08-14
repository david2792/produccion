"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../../controladores/acceso/usuario");
class UsuarioRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', usuario_1.usuarioControlador.acceso);
        // this.router.post('/',listaPrecioControlador.crear);
    }
}
const usuarioRutas = new UsuarioRutas();
exports.default = usuarioRutas.router;
