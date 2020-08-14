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
exports.listaPrecioControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class ListaPrecio {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield conexionBD_1.default.query('SELECT * FROM vproductos');
            res.json(productos);
        });
    }
    recuperarCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(CodigoProducto) as codigo FROM productos');
            JSON.stringify(codigomaximo);
            const codigo = codigomaximo[0].codigo;
            res.json(codigo + 1);
        });
    }
    // public async recuperarCodigo(req: Request, res: Response): Promise<any> {
    //   const codigomaximo = await mysqlConexion.query('SELECT MAX(Codigo) as Codigo+1 FROM listaprecios', (err, rows, fields) => {
    //     if (!err) {
    //       return res.json(rows[0].Codigo)
    //     } else {
    //       console.log(err)
    //     }
    //   });
    // }
    // public async anular(req: Request, res: Response): Promise<any> {
    //   try {
    //     const Codigo = req.body.Codigo;
    //     let Estado = req.body.Estado;
    //     console.log(Estado);
    //     if (Estado == "ACTIVADO") {
    //       Estado = "DESACTIVADO";
    //     } else {
    //       Estado = "ACTIVADO";
    //     }
    //     const values = { Estado }
    //     const lista = await mysqlConexion.query('UPDATE listaprecios SET ? WHERE Codigo=?', [values, Codigo]);
    //     res.json(lista);
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productos = yield conexionBD_1.default.query('SELECT * FROM  listaprecio1 WHERE CodigoProducto=?', [id]);
            if (productos.length > 0) {
                return res.json(productos);
            }
            res.status(404).json({ text: 'El producto no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield conexionBD_1.default.query("START TRANSACTION"); // se inica la transaccion
                const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(codigo)+1 AS codigo FROM listaprecios');
                JSON.stringify(codigomaximo);
                const Codigo = codigomaximo[0].codigo;
                const depo = req.body.depo;
                console.log(depo);
                const iddeposito = yield conexionBD_1.default.query('SELECT codigoDeposito FROM depositos WHERE Nombre =?', depo);
                JSON.stringify(iddeposito);
                const codigoDeposito = iddeposito[0].codigoDeposito;
                const CodigoProducto = req.body.codigoproducto;
                const Descripcion = req.body.Descripcion;
                const Precio = req.body.Precio;
                const Porcentaje = "0";
                const PrecioCompra = '0';
                const Cuotas = req.body.Cuotas;
                const lista = { Codigo, codigoDeposito, CodigoProducto, Descripcion, Precio, Porcentaje, PrecioCompra, Cuotas }; // datos de productos
                console.log(lista);
                yield conexionBD_1.default.query('INSERT INTO listaprecios  SET ?', lista); // se inserta los datos en la tabla productos
                yield conexionBD_1.default.query("COMMIT"); // se confirma la transaccion
                res.json({ message: "el producto fue guardado" });
            }
            catch (error) {
                yield conexionBD_1.default.query("ROLLBACK");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    anular(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Codigo = req.body.Codigo;
                let Estado = req.body.Estado;
                console.log(Estado);
                if (Estado == "ACTIVADO") {
                    Estado = "DESACTIVADO";
                }
                else {
                    Estado = "ACTIVADO";
                }
                const values = { Estado };
                const lista = yield conexionBD_1.default.query('UPDATE listaprecios SET ? WHERE Codigo=?', [values, Codigo]);
                res.json(lista);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Codigo = req.body.Codigo;
                console.log(Codigo);
                const Descripcion = req.body.Descripcion;
                const Precio = req.body.Precio;
                const Porcentaje = "0";
                const PrecioCompra = '0';
                const Cuotas = req.body.Cuotas;
                const lista = { Codigo, Descripcion, Precio, Porcentaje, PrecioCompra, Cuotas }; // datos de productos
                console.log(lista);
                yield conexionBD_1.default.query('UPDATE  listaprecios  SET ? WHERE Codigo =?', [lista, Codigo]); // se inserta los datos en la tabla productos
                res.json({ message: "el producto fue guardado" });
            }
            catch (error) {
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
}
exports.listaPrecioControlador = new ListaPrecio();
