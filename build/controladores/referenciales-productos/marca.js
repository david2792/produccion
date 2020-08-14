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
exports.marcasControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class MarcasControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM marcas');
            res.json(marcas);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('SELECT * FROM marcas WHERE CodigoMarca=?', [id]);
            if (marcas.length > 0) {
                return res.json(marcas[0]);
                console.log(marcas);
            }
            res.status(404).json({ text: 'La marca no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoMarca)+1 AS CodigoMarca FROM marcas');
                JSON.stringify(codigo);
                const CodigoMarca = codigo[0].CodigoMarca;
                console.log(CodigoMarca);
                const Descripcion = req.body.Descripcion;
                const values = { CodigoMarca, Descripcion };
                yield conexionBD_1.default.query('INSERT INTO marcas  SET ?', values);
                res.json({ message: "la marca fue guardada" });
            }
            catch (error) {
                console.log('error' + error);
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM marcas WHERE CodigoMarca=?', [id]);
            res.json({ message: 'La marca fue eliminado' });
        });
    }
    actualiar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = req.body.CodigoMarca;
                const Descripcion = req.body.Descripcion;
                const categoria = yield conexionBD_1.default.query('UPDATE marcas SET ? WHERE CodigoMarca = ?', [req.body, codigo]);
                res.json({ message: 'La marca fue actualizada' });
            }
            catch (error) {
                console.log('error' + error);
            }
        });
    }
}
exports.marcasControlador = new MarcasControlador();
