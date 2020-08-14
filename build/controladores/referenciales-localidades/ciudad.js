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
exports.ciudadesControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class CiudadesControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familias = yield conexionBD_1.default.query('SELECT * FROM vciudades');
            res.json(familias);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoCiudad)+1 AS Codigo FROM ciudades');
            JSON.stringify(codigo);
            const CodigoCiudad = codigo[0].Codigo;
            const departamento = req.body.Departamento;
            const Nombre = req.body.Nombre;
            const id = yield conexionBD_1.default.query('SELECT CodigoDepartamento FROM departamentos  WHERE Nombre =?', departamento);
            JSON.stringify(id);
            const CodigoDepartamento = id[0].CodigoDepartamento;
            const values = { CodigoCiudad, Nombre, CodigoDepartamento };
            yield conexionBD_1.default.query('INSERT INTO ciudades  SET ?', values);
            res.json({ message: "la ciudad fue guardada" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const CodigoCiudad = req.body.CodigoCiudad;
            const Departamento = req.body.Departamento;
            const Nombre = req.body.Nombre;
            const iddepartamento = yield conexionBD_1.default.query('SELECT CodigoDepartamento FROM departamentos WHERE Nombre =?', Departamento);
            JSON.stringify(iddepartamento);
            const CodigoDepartamento = iddepartamento[0].CodigoDepartamento;
            const values = { CodigoCiudad, Nombre, CodigoDepartamento };
            const marcas = yield conexionBD_1.default.query('UPDATE ciudades SET ? WHERE CodigoCiudad = ?', [values, CodigoCiudad]);
            res.json({ message: 'ciudad fue actualizado' });
        });
    }
    listarDepartamento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const departamento = yield conexionBD_1.default.query('SELECT * FROM departamentos');
            res.json(departamento);
        });
    }
}
exports.ciudadesControlador = new CiudadesControlador();
