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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const defaultUser = {
    user: 'admin',
    password: 'admin',
};
const secret = process.env.SECRET || '';
function login(user, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        if (defaultUser.user !== user || defaultUser.password !== pass)
            throw new Error('Credentials are wrong');
        return signJWT({ user });
    });
}
function signJWT(payload) {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
    return { payload, token };
}
function verifyJWT(token) {
    jsonwebtoken_1.default.verify(token, secret, (err, token) => {
        if (err)
            throw new Error('You are not authorized');
        return token;
    });
}
const authService = {
    login,
    signJWT,
    verifyJWT,
};
exports.default = authService;
