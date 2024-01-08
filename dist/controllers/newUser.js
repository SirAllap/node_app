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
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserController = void 0;
const auth_1 = require("../services/auth");
const express_1 = require("express");
exports.newUserController = (0, express_1.Router)();
exports.newUserController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_1.authService.signup(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
