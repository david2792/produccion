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
exports.familiaControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class FamiliaControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familias = yield conexionBD_1.default.query('SELECT * FROM familias');
            res.json(familias);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const familias = yield conexionBD_1.default.query('SELECT * FROM familias WHERE codigo=?', [id]);
            if (familias.length > 0) {
                return res.json(familias[0]);
                console.log(familias);
            }
            res.status(404).json({ text: 'La familias no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexionBD_1.default.query('INSERT INTO familias set ?', [req.body]);
            res.json({ message: "la familias fue guardado" });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM familias WHERE codigo=?', [id]);
            res.json({ message: 'La familia fue eliminada' });
        });
    }
    actualiar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('UPDATE familias SET ? WHERE codigo = ?', [req.body, id]);
            res.json({ message: 'La familia fue actualizada' });
        });
    }
}
exports.familiaControlador = new FamiliaControlador();
