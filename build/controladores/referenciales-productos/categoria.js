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
exports.categoriaControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class CategoriaControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familias = yield conexionBD_1.default.query('SELECT * FROM categorias');
            res.json(familias);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const familias = yield conexionBD_1.default.query('SELECT * FROM  categorias WHERE CodigoCategoria=?', [id]);
            if (familias.length > 0) {
                return res.json(familias[0]);
                console.log(familias);
            }
            res.status(404).json({ text: 'La categoria no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoCategoria)+1 AS CodigoCategoria FROM categorias');
                JSON.stringify(codigo);
                const CodigoCategoria = codigo[0].CodigoCategoria;
                console.log(CodigoCategoria);
                const Descripcion = req.body.Descripcion;
                const values = { CodigoCategoria, Descripcion };
                yield conexionBD_1.default.query('INSERT INTO categorias  SET ?', values);
                res.json({ message: "la categoria fue guardada" });
            }
            catch (error) {
                console.log("ocurrio un error " + error);
            }
        });
    }
    actualiar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = req.body.CodigoCategoria;
                const Descripcion = req.body.Descripcion;
                console.log(codigo);
                const categoria = yield conexionBD_1.default.query('UPDATE categorias SET ? WHERE CodigoCategoria = ?', [req.body, codigo]);
                res.json({ message: 'La categoria fue actualizada' });
            }
            catch (error) {
                console.log("ocurrio un error " + error);
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id }= req.params;
            const codigo = req.body.CodigoCategoria;
            const categoria = yield conexionBD_1.default.query('DELETE FROM categorias WHERE CodigoCategoria=?', [codigo]);
            res.json({ message: 'La categoria fue eliminada' });
        });
    }
    listarFamilia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familia = yield conexionBD_1.default.query('SELECT * FROM familias');
            res.json(familia);
        });
    }
}
exports.categoriaControlador = new CategoriaControlador();
