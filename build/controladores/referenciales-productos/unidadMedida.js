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
exports.medidasControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class MedidasControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unidad = yield conexionBD_1.default.query('SELECT * FROM unidadmedida');
            res.json(unidad);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unidad = yield conexionBD_1.default.query('SELECT * FROM unidadmedida WHERE CodigoUnidad=?', [id]);
            if (unidad.length > 0) {
                return res.json(unidad[0]);
                console.log(unidad);
            }
            res.status(404).json({ text: 'La unidad de medida no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoUnidad)+1 AS CodigoUnidad FROM unidadmedida');
                JSON.stringify(codigo);
                const CodigoUnidad = codigo[0].CodigoUnidad;
                console.log(CodigoUnidad);
                const Descripcion = req.body.Descripcion;
                const Simbolo = req.body.Simbolo;
                const values = { CodigoUnidad, Descripcion, Simbolo };
                yield conexionBD_1.default.query('INSERT INTO unidadmedida  SET ?', values);
                res.json({ message: "la unidad fue guardada" });
            }
            catch (error) {
                console.log("ocurrio un error " + error);
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM unidadmedida WHERE CodigoUnidad=?', [id]);
            res.json({ message: 'La unidad de medida fue eliminado' });
        });
    }
    actualiar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = req.body.CodigoUnidad;
                const Descripcion = req.body.Descripcion;
                const Simbolo = req.body.Simbolo;
                console.log(codigo, Descripcion, Simbolo);
                const categoria = yield conexionBD_1.default.query('UPDATE unidadmedida SET ? WHERE CodigoUnidad = ?', [req.body, codigo]);
                res.json({ message: 'La unidad de medida fue actualizada' });
            }
            catch (error) {
                console.log("ocurrio un error " + error);
            }
        });
    }
}
exports.medidasControlador = new MedidasControlador();
