"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
exports.signup = (req, res) => {
    console.log(req.body);
    res.send('signup');
};
exports.signin = (req, res) => {
    res.send('signin');
};
