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
exports.paisControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class PaisControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM paises');
            res.json(marcas);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoPais)+1 AS Codigo FROM paises');
            JSON.stringify(codigo);
            const CodigoPais = codigo[0].Codigo;
            console.log(CodigoPais);
            const Nombre = req.body.Nombre;
            const values = { CodigoPais, Nombre };
            yield conexionBD_1.default.query('INSERT INTO paises set ?', values);
            res.json({ message: "PAIS GUARDADO" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const CodigoPais = req.body.CodigoPais;
            const Nombre = req.body.Nombre;
            const values = { CodigoPais, Nombre };
            console.log(values);
            const pais = yield conexionBD_1.default.query('UPDATE paises SET ? WHERE CodigoPais = ?', [values, CodigoPais]);
            res.json({ message: 'El pais fue actualizado' });
        });
    }
}
exports.paisControlador = new PaisControlador();
