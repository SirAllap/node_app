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
exports.usersController = void 0;
const express_1 = require("express");
const user_1 = require("../services/user");
const validation_1 = require("../validators/validation");
const schemas_1 = require("../validators/schemas");
exports.usersController = (0, express_1.Router)();
exports.usersController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.userService.fetchAll();
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.usersController.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.userService.fetchOne(req.params.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));

exports.usersController.post('/', (0, validation_1.validateOject)(schemas_1.userSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = Object.assign({}, req.body);
        yield user_1.userService.createOne(newUser);
        res.json('User successfully created');

    }
    catch (error) {
        next(error);
    }
}));

exports.usersController.put('/:userId', (0, validation_1.validateOject)(schemas_1.userSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userToUpdate = Object.assign({}, req.body);
        yield user_1.userService.updateOne(id, userToUpdate),
            res.json('User successfully updated');

    }
    catch (error) {
        next(error);
    }
}));
exports.usersController.delete('/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.userService.destroyOne(req.params.userId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
