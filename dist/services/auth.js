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
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const secret = process.env.SECRET || '';
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findOne({ email: email });
    if (!result)
        throw new Error('User not found');
    bcrypt_1.default.compare(password, result.password || '', (err, res) => {
        if (err)
            throw new Error('Something went wrong');
        if (!res)
            throw new Error('Email or password incorrect');
    });
    const signResponse = signJWT({ email });
    return signResponse;
});
const signJWT = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
    return { payload, token };
};
const verifyJWT = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
};
exports.authService = {
    login,
    signJWT,
    verifyJWT,
};
