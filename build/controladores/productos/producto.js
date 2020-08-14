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
exports.productoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class ProductoControlador {
    recuperarCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(CodigoProducto)+1 AS codigo FROM productos');
            JSON.stringify(codigomaximo);
            const codigo = codigomaximo[0].codigo;
            console.log(codigo);
            res.json(codigo);
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield conexionBD_1.default.query('SELECT * FROM vproductos where CodigoProducto>0');
            res.json(productos);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productos = yield conexionBD_1.default.query('SELECT * FROM  vproductos WHERE Codigoproducto=?', [id]);
            if (productos.length > 0) {
                return res.json(productos[0]);
                console.log(productos);
            }
            res.status(404).json({ text: 'El producto no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoria = req.body.Categoria;
                console.log(categoria);
                const id = yield conexionBD_1.default.query('SELECT CodigoCategoria FROM categorias WHERE Descripcion =?', categoria);
                JSON.stringify(id); //CONVIERTE LA CONSULTA A UN JSON
                //se capturan los codigos
                const marca = req.body.Marca;
                console.log(marca);
                const idmarca = yield conexionBD_1.default.query('SELECT CodigoMarca FROM marcas WHERE Descripcion =?', marca);
                JSON.stringify(idmarca);
                ///
                const impuesto = req.body.Impuesto;
                console.log(impuesto);
                const idimpuesto = yield conexionBD_1.default.query('SELECT CodigImpuesto FROM tipoimpuesto WHERE Descripcion =?', impuesto);
                JSON.stringify(idimpuesto);
                ///
                const deposito = req.body.Deposito;
                console.log(deposito);
                const iddeposito = yield conexionBD_1.default.query('SELECT codigoDeposito FROM depositos WHERE Nombre =?', deposito);
                JSON.stringify(iddeposito);
                // se inicia recuperando los datos de la tabla productos
                const CodigoProducto = req.body.CodigoProducto;
                const CodigoCategoria = id[0].CodigoCategoria;
                const CodigoMarca = idmarca[0].CodigoMarca;
                const CodigoUnidad = '1';
                const CodigoRepresentante = '1';
                const CodigImpuesto = idimpuesto[0].CodigImpuesto;
                const CodigoBarra = req.body.CodigoBarra;
                const Descripcion = req.body.Descripcion;
                const cantidadpaquete = '0';
                const perecedero = '1';
                const peso = '0';
                const estado = '1';
                const productos = {
                    CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
                    CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
                }; // datos de productos
                const codigoDeposito = iddeposito[0].codigoDeposito;
                const StockActual = req.body.StockActual;
                const StockMinimo = req.body.StockMinimo;
                const StockMaximo = 0;
                const PrecioCompra = req.body.PrecioCompra;
                const PrecioVentaMinorista = req.body.PrecioVentaMinorista;
                const PrecioVentaMayorista = req.body.PrecioVentaMinorista;
                const UtilidadMinima = 0;
                const UtilidadMaxima = 0;
                const stock = {
                    codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
                    PrecioVentaMayorista
                };
                // console.log(stock)
                const set0 = transaccionBD_1.default.query("SET autocommit=0");
                const prod = transaccionBD_1.default.query('INSERT INTO productos  SET ?', productos); // se inserta los datos en la tabla productos
                const sto = transaccionBD_1.default.query('INSERT INTO stock  SET ?', stock); // se inserta los datos en la tabla stock
                const comi = transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                const set1 = transaccionBD_1.default.query("SET autocommit=1");
                yield Promise.all([set0, prod, sto, comi, set1]);
                res.json({ message: "el producto fue guardado" });
            }
            catch (error) {
                const rol = transaccionBD_1.default.query("ROLLBACK");
                const set11 = transaccionBD_1.default.query("SET autocommit=1");
                yield Promise.all([rol, set11]);
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = req.body.Categoria;
            console.log(categoria);
            const id = yield conexionBD_1.default.query('SELECT CodigoCategoria FROM categorias WHERE Descripcion =?', categoria);
            JSON.stringify(id); //CONVIERTE LA CONSULTA A UN JSON
            //se capturan los codigos
            const marca = req.body.Marca;
            console.log(marca);
            const idmarca = yield conexionBD_1.default.query('SELECT CodigoMarca FROM marcas WHERE Descripcion =?', marca);
            JSON.stringify(idmarca);
            ///
            const impuesto = req.body.Impuesto;
            console.log(impuesto);
            const idimpuesto = yield conexionBD_1.default.query('SELECT CodigImpuesto FROM tipoimpuesto WHERE Descripcion =?', impuesto);
            JSON.stringify(idimpuesto);
            ///
            const deposito = req.body.Deposito;
            console.log(deposito);
            const iddeposito = yield conexionBD_1.default.query('SELECT codigoDeposito FROM depositos WHERE Nombre =?', deposito);
            JSON.stringify(iddeposito);
            // se inicia recuperando los datos de la tabla productos
            const CodigoProducto = req.body.CodigoProducto;
            const CodigoCategoria = id[0].CodigoCategoria;
            const CodigoMarca = idmarca[0].CodigoMarca;
            const CodigoUnidad = '1';
            const CodigoRepresentante = '1';
            const CodigImpuesto = idimpuesto[0].CodigImpuesto;
            const CodigoBarra = req.body.CodigoBarra;
            const Descripcion = req.body.Descripcion;
            const cantidadpaquete = '0';
            const perecedero = '1';
            const peso = '0';
            const estado = '1';
            const productos = {
                CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
                CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
            }; // datos de productos
            const codigoDeposito = iddeposito[0].codigoDeposito;
            const StockActual = req.body.StockActual;
            const StockMinimo = req.body.StockMinimo;
            const StockMaximo = 0;
            const PrecioCompra = req.body.PrecioCompra;
            const PrecioVentaMinorista = req.body.PrecioVentaMinorista;
            const PrecioVentaMayorista = req.body.PrecioVentaMinorista;
            const UtilidadMinima = 0;
            const UtilidadMaxima = 0;
            const stock = {
                codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
                PrecioVentaMayorista
            };
            try {
                console.time('loop');
                let set = transaccionBD_1.default.query("SET autocommit=0");
                let produc = transaccionBD_1.default.query('UPDATE productos  SET ? WHERE codigoproducto= ?', [productos, CodigoProducto]); // se inserta los datos en la tabla productos
                let sto = transaccionBD_1.default.query('UPDATE  stock  SET ? WHERE codigoproducto= ?', [stock, CodigoProducto]); // se inserta los datos en la tabla stock
                let comi = transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                let set1 = transaccionBD_1.default.query("SET autocommit=1");
                yield Promise.all([set, produc, sto, comi, set1]);
                res.json({ message: "el producto fue actualizado" });
                console.timeEnd('loop');
            }
            catch (error) {
                let ro = transaccionBD_1.default.query("ROLLBACK");
                let a11 = transaccionBD_1.default.query("SET autocommit=1");
                yield Promise.all([ro, a11]);
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    listarFamilia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familia = yield conexionBD_1.default.query('SELECT * FROM familias');
            res.json(familia);
        });
    }
    listarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familias = yield conexionBD_1.default.query('SELECT * FROM categorias');
            res.json(familias);
        });
    }
    listarDeposito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deposito = yield conexionBD_1.default.query('SELECT * FROM depositos');
            res.json(deposito);
        });
    }
    listarImpuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unidad = yield conexionBD_1.default.query('SELECT * FROM tipoimpuesto');
            res.json(unidad);
        });
    }
    listarMarcas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM marcas');
            res.json(marcas);
        });
    }
    listarMedida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unidad = yield conexionBD_1.default.query('SELECT * FROM unidadesmedida');
            res.json(unidad);
        });
    }
    listarPresentacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentaciones = yield conexionBD_1.default.query('SELECT * FROM presentaciones');
            res.json(presentaciones);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM productos WHERE codigoproducto=?', [id]);
            res.json({ message: 'La el producto fue eliminado' });
        });
    }
}
exports.productoControlador = new ProductoControlador();
