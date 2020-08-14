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
exports.departamentoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class DepartamentosControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familias = yield conexionBD_1.default.query('SELECT * FROM vdepartamentos');
            res.json(familias);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoDepartamento)+1 AS Codigo FROM departamentos');
            JSON.stringify(codigo);
            const CodigoDepartamento = codigo[0].Codigo;
            const Pais = req.body.Pais;
            console.log(Pais);
            const Nombre = req.body.Nombre;
            const id = yield conexionBD_1.default.query('SELECT CodigoPais FROM paises WHERE Nombre =?', Pais);
            JSON.stringify(id); //CONVIERTE LA CONSULTA A UN JSON
            const CodigoPais = id[0].CodigoPais; //CAPTURA EL VALOR DEL CODIDO FAMILIA DESDE EL DOCUMENTO JSON
            const values = { CodigoDepartamento, Nombre, CodigoPais };
            console.log(values);
            yield conexionBD_1.default.query('INSERT INTO departamentos  SET ?', values);
            res.json({ message: "el departamentoo fue guardada" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const CodigoDepartamento = req.body.CodigoDepartamento;
            const pais = req.body.Pais;
            const Nombre = req.body.Nombre;
            const idpais = yield conexionBD_1.default.query('SELECT CodigoPais FROM paises WHERE Nombre =?', pais);
            JSON.stringify(idpais); //CONVIERTE LA CONSULTA A UN JSON
            const CodigoPais = idpais[0].CodigoPais; //CAPTURA EL VALOR DEL CODIDO FAMILIA DESDE EL DOCUMENTO JSON
            const values = { CodigoDepartamento, Nombre, CodigoPais };
            const marcas = yield conexionBD_1.default.query('UPDATE departamentos SET ? WHERE CodigoDepartamento = ?', [values, CodigoDepartamento]);
            res.json({ message: 'el departamento fue actualizado' });
        });
    }
}
exports.departamentoControlador = new DepartamentosControlador();
