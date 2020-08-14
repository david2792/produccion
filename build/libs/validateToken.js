"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.TokenValidation = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token)
            return res.status(401).json('Access Denied');
        const payload = jsonwebtoken_1.default.verify(token, 'Secret Password' || 'Secret Password');
        console.log(payload);
        req.usuario = payload.NivelUsuario;
        next();
    }
    catch (e) {
        res.status(400).send('Invalid Token');
    }
};
