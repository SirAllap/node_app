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
exports.usersController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = Object.assign({}, req.body);
        yield user_1.userService.createOne(newUser);
        res.json('User successfully created');
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.usersController.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userToUpdate = Object.assign({}, req.body);
        yield user_1.userService.updateOne(id, userToUpdate),
            res.json('User successfully updated');
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.usersController.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        yield user_1.userService.destroyOne(id);
        res.json('User successfully deleted');
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
