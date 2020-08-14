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
exports.tiposTransmisionControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class TiposTransmisionControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM tipostransmision');
            res.json(marcas);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('SELECT * FROM tipostransmision WHERE codigo=?', [id]);
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
                const Codigo = yield conexionBD_1.default.query('SELECT MAX(codigo)+1 AS Codigo FROM tipostransmision');
                JSON.stringify(Codigo);
                const codigo = Codigo[0].Codigo;
                console.log(codigo);
                const nombre = req.body.nombre;
                const values = { codigo, nombre };
                yield conexionBD_1.default.query('INSERT INTO tipostransmision  SET ?', values);
                res.json({ message: "el anio fue guardado" });
            }
            catch (error) {
                console.log('error' + error);
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM tipostransmision WHERE codigo=?', [id]);
            res.json({ message: 'La marca fue eliminado' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = req.body.codigo;
                const nombre = req.body.nombre;
                const categoria = yield conexionBD_1.default.query('UPDATE tipostransmision SET ? WHERE codigo = ?', [req.body, codigo]);
                res.json({ message: 'La marca fue actualizada' });
            }
            catch (error) {
                console.log('error' + error);
            }
        });
    }
}
exports.tiposTransmisionControlador = new TiposTransmisionControlador();
