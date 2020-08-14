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
exports.controladorCliente = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class ClienteControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield conexionBD_1.default.query('SELECT * FROM vclientes');
            res.json(usuario);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoCliente)+1 AS Codigo FROM clientes');
            JSON.stringify(Codigo);
            const CodigoCliente = Codigo[0].Codigo;
            const Ciudad = req.body.Ciudad;
            const id = yield conexionBD_1.default.query('SELECT CodigoCiudad FROM ciudades WHERE Nombre =?', Ciudad);
            JSON.stringify(id);
            const CodigoCiudad = id[0].CodigoCiudad;
            console.log(CodigoCiudad);
            const Cedula = req.body.Cedula;
            const Ruc = req.body.Ruc;
            const RazonSocial = req.body.RazonSocial;
            const Direccion = req.body.Direccion;
            const Telefono = req.body.Telefono;
            const Email = req.body.Email;
            const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono, Email, CodigoCiudad };
            console.log(values);
            yield conexionBD_1.default.query('INSERT INTO clientes  SET ?', values);
            res.json({ message: "el cliente  fue guardado" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const CodigoCliente = req.body.CodigoCliente;
            const Ciudad = req.body.Ciudad;
            const idciudad = yield conexionBD_1.default.query('SELECT CodigoCiudad FROM ciudades WHERE Nombre =?', Ciudad);
            JSON.stringify(idciudad);
            const CodigoCiudad = idciudad[0].CodigoCiudad;
            const Cedula = req.body.Cedula;
            const Ruc = req.body.Ruc;
            const RazonSocial = req.body.RazonSocial;
            const Direccion = req.body.Direccion;
            const Telefono = req.body.Telefono;
            const Email = req.body.Email;
            const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono, Email, CodigoCiudad };
            console.log(values);
            const marcas = yield conexionBD_1.default.query('UPDATE clientes SET ? WHERE CodigoCliente = ?', [values, CodigoCliente]);
            res.json({ message: 'el cliente fue actualizado' });
        });
    }
    listarCiudad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciudad = yield conexionBD_1.default.query('SELECT nombre FROM ciudades');
            res.json(ciudad);
        });
    }
}
exports.controladorCliente = new ClienteControlador();
