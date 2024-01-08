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
exports.usersClientController = void 0;
const express_1 = require("express");
const userClientService_1 = require("../services/userClientService");
exports.usersClientController = (0, express_1.Router)();
exports.usersClientController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userClientService_1.userClientService.fetchAll();
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.usersClientController.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userClientService_1.userClientService.fetchOne(req.params.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.usersClientController.put('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userClientService_1.userClientService.updateOne(req.params.userId, req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.usersClientController.delete('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userClientService_1.userClientService.destroyOne(req.params.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
