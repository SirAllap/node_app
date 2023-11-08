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
exports.authController = void 0;
const auth_1 = require("../services/auth");
const express_1 = require("express");
const validation_1 = require("../validators/validation");
const schemas_1 = require("../validators/schemas");
exports.authController = (0, express_1.Router)();
exports.authController.post('/', (0, validation_1.validateOject)(schemas_1.authSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.body.user;
        const password = req.body.pass;
        const result = yield auth_1.authService.login(userName, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json(`${error}`);
    }
}));
