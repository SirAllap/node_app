"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_1 = require("../services/auth");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.get('token') || '';
        auth_1.authService.verifyJWT(token);
        next();
    }
    catch (error) {
        res.status(401).json({ error: true, message: 'You are not authorized' });
    }
};
exports.authMiddleware = authMiddleware;
