"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioControlador = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const conexionBD_1 = __importDefault(require("../../conexionBD"));
// import randtoken from 'rand-token';
// var randtoken = require('rand-token') ;
class UsuarioControlador {
    /**
     * acceso al sistema
     */
    acceso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var SECRET = "SECRETO_PARA_ENCRIPTACION";
            try {
                const usuario = yield conexionBD_1.default.query('SELECT * FROM vusuarios GROUP BY CodigoUsuario  ');
                JSON.stringify(usuario);
                const cod = usuario[0].CodigoUsuario;
                const Usuario = usuario[0].Usuario;
                const Clave = usuario[0].Clave;
                const NivelUsuario = usuario[0].NivelUsuario;
                const PuntoExpedicion = usuario[0].PuntoExpedicion;
                const CodigoSucursal = usuario[0].CodigoSucursal;
                const value = { Usuario, Clave };
                const users = req.body.usuario;
                const pass = req.body.password;
                console.log(users);
                console.log(pass);
                if (users == Usuario && Clave == pass) {
                    var tokenData = {
                        codigo: cod,
                        users: users,
                        pass: pass,
                        NivelUsuario: NivelUsuario,
                        PuntoExpedicion: PuntoExpedicion,
                        CodigoSucursal: CodigoSucursal
                        // ANY DATA
                    };
                    console.log("bienvenido");
                    // var token = jwt.sign(users:users, SECRET, { expiresIn: '1h' , algorithm: 'RS256' })
                    var token = jsonwebtoken_1.default.sign(tokenData, 'Secret Password', {
                        expiresIn: "8h" // expires in 24 hours
                    });
                    // console.log(token)
                    console.log(tokenData);
                    res.header('auth-token', token).json({ token, tokenData });
                }
                else {
                }
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    verificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var SECRET = "Secret Password";
            var token = req.headers['authorization'];
            if (!token) {
                res.status(401).send({
                    error: "Es necesario el token de autenticación"
                });
                return;
            }
            token = token.replace('Bearer ', '');
            jsonwebtoken_1.default.verify(token, 'Secret Password', function (err, user) {
                if (err) {
                    res.status(401).send({
                        error: 'Token inválido'
                    });
                }
                else {
                    res.send({
                        message: 'Awwwww yeah!!!!'
                    });
                }
            });
        });
    }
}
exports.usuarioControlador = new UsuarioControlador();
