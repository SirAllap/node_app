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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const userClient_model_1 = require("../models/userClient.model");
const secret = process.env.SECRET || '';
const signup = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = bcryptjs_1.default.hashSync(user.password || '', 10);
    const result = yield userClient_model_1.UserClientModel.create(user);
    return result;
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ email: email });
    if (!result)
        throw new Error();
    const passwordCheck = yield bcryptjs_1.default.compare(password, result.password || '');
    if (!passwordCheck)
        throw new Error();
    const userInfo = {
        email: result.email,
        name: result.full_name,
        role: result.description,
        photo: result.photo,
    };
    return signJWT({ userInfo });
});
const loginClient = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userClient_model_1.UserClientModel.findOne({ email: email });
    if (!result)
        throw new Error();
    const passwordCheck = yield bcryptjs_1.default.compare(password, result.password || '');
    if (!passwordCheck)
        throw new Error();
    const userClientInfo = {
        email: result.email,
        name: result.full_name,
    };
    return signJWT({ userInfo: userClientInfo });
});
const signJWT = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '5h' });
    return { payload, token };
};
const verifyJWT = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
};
exports.authService = {
    signup,
    login,
    loginClient,
    signJWT,
    verifyJWT,
};
