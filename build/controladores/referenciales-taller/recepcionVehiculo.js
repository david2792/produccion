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
exports.recepcionvehiculoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class RecepcionVehiculoControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const CodigoCliente = req.body.cliente;
            console.log(CodigoCliente);
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vclientevehiculos WHERE CodigoCliente=?', id);
            res.json(marcas);
        });
    }
    listarRecepcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vrecepciones');
            res.json(marcas);
        });
    }
    guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigosucursal = req.body.CodigoSucursal;
                const puntoexpedicion = req.body.PuntoExpedicion;
                const numero = '1';
                const CodigoCliente = req.body.codigocliente;
                const recibidopor = req.body.recibidopor;
                const estado = req.body.estado;
                const fechaentrada = "2020-08-12";
                const horaentrada = "00:00:00";
                const observaciones = req.body.observaciones;
                const recepciones = { codigosucursal, puntoexpedicion, numero, CodigoCliente, recibidopor, estado, fechaentrada,
                    horaentrada, observaciones };
                console.log(recepciones);
                yield transaccionBD_1.default.query("SET autocommit=0");
                yield transaccionBD_1.default.query('INSERT INTO recepciones  SET ?', recepciones);
                let detalles = req.body.detalles;
                console.log(detalles);
                for (let i in detalles) {
                    const codigonivelcombustible = detalles[i].codigonivel;
                    const codigovehiculos = detalles[i].Codigo;
                    const km = detalles[i].km;
                    const detalle = { codigosucursal, puntoexpedicion, numero, codigovehiculos, codigonivelcombustible, km };
                    yield transaccionBD_1.default.query('INSERT INTO detallesrecepciones  SET ?', detalle);
                }
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                res.json({ message: "el producto fue guardado" });
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
}
exports.recepcionvehiculoControlador = new RecepcionVehiculoControlador();
