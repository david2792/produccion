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
exports.timbradoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class TimbradoControlador {
    recuperarCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(NumeroTimbrado)+1 AS codigo FROM timbrados');
            JSON.stringify(codigomaximo);
            const codigo = codigomaximo[0].codigo;
            console.log(codigo);
            res.json(codigo);
        });
    }
    listarTimbrados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const timbrados = yield conexionBD_1.default.query('SELECT * FROM timbrados');
            console.log(timbrados);
            res.json(timbrados);
        });
    }
}
exports.timbradoControlador = new TimbradoControlador();
