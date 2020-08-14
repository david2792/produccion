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
exports.vehiculoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class VehiculoControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vclientevehiculos');
            res.json(marcas);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('SELECT * FROM tracciones WHERE codigo=?', [id]);
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
                const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(codigo)+1 AS codigo FROM vehiculos');
                JSON.stringify(codigomaximo);
                let codigo = codigomaximo[0].codigo;
                if (codigo == null) {
                    codigo = 1;
                }
                const codigomarca = req.body.marca;
                const codigomodelo = req.body.modelo;
                const codigotransmision = req.body.transmicion;
                const codigotipocombustible = "1";
                const codigotraccion = "1";
                const codigocolor = req.body.color;
                const codigoanio = "1";
                const numerochapa = req.body.chapa;
                const numerochasis = req.body.chasis;
                const vehiculos = {
                    codigo, codigomarca, codigomodelo, codigotransmision, codigotipocombustible, codigotraccion, codigocolor,
                    codigoanio, numerochapa, numerochasis
                };
                const codigocliente = req.body.cliente;
                const codigovehiculo = codigo;
                const detallevehiculo = { codigovehiculo, codigocliente };
                console.log(vehiculos);
                yield transaccionBD_1.default.query("SET autocommit=0");
                yield transaccionBD_1.default.query('INSERT INTO vehiculos  SET ?', vehiculos);
                yield transaccionBD_1.default.query('INSERT INTO detallesvehiculos  SET ?', detallevehiculo);
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                // await Promise.all([set0, cabecera, detalle, comi, set1])
                res.json({ message: "el anio fue guardado" });
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                // await Promise.all([rol, set11]);
                console.log('error' + error);
            }
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM tracciones WHERE codigo=?', [id]);
            res.json({ message: 'La marca fue eliminado' });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigo = req.body.codigo;
                const nombre = req.body.nombre;
                const categoria = yield conexionBD_1.default.query('UPDATE tracciones SET ? WHERE codigo = ?', [req.body, codigo]);
                res.json({ message: 'La marca fue actualizada' });
            }
            catch (error) {
                console.log('error' + error);
            }
        });
    }
}
exports.vehiculoControlador = new VehiculoControlador();
