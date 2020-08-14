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
exports.impuestoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class ImpuestoControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unidad = yield conexionBD_1.default.query('SELECT * FROM tipoimpuesto');
            res.json(unidad);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const unidad = yield conexionBD_1.default.query('SELECT * FROM tipoimpuesto WHERE CodigImpuesto=?', [id]);
            if (unidad.length > 0) {
                return res.json(unidad[0]);
                console.log(unidad);
            }
            res.status(404).json({ text: 'El impuesto no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigImpuesto)+1 AS CodigImpuesto FROM tipoimpuesto');
                JSON.stringify(codigo);
                const CodigImpuesto = codigo[0].CodigImpuesto;
                console.log(CodigImpuesto);
                const Descripcion = req.body.Descripcion;
                const Porcentaje = req.body.Porcentaje;
                const DividirPor = req.body.DividirPor;
                const values = { CodigImpuesto, Descripcion, Porcentaje, DividirPor };
                yield conexionBD_1.default.query('INSERT INTO  tipoimpuesto  SET ?', values);
                res.json({ message: "El impuesto fue guardado" });
            }
            catch (error) {
                console.log('ocurrio un error ' + error);
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM tipoimpuesto WHERE CodigImpuesto=?', [id]);
            res.json({ message: 'El impuesto fue eliminado' });
        });
    }
    actualiar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = req.body.CodigImpuesto;
                const Descripcion = req.body.Descripcion;
                const Porcentaje = req.body.Porcentaje;
                const DividirPor = req.body.DividirPor;
                console.log(codigo);
                const categoria = yield conexionBD_1.default.query('UPDATE tipoimpuesto SET ? WHERE CodigImpuesto = ?', [req.body, codigo]);
                res.json({ message: 'El impuesto fue actualizado' });
            }
            catch (error) {
                console.log('ocurrio un error ' + error);
            }
        });
    }
}
exports.impuestoControlador = new ImpuestoControlador();
