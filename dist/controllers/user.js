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
        const result = yield user_1.userService.get();
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));
exports.usersController.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.userService.getById(req.params.userId);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));
exports.usersController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.userService.post(req.body);
        res.status(200).send('User successfully created');
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));
exports.usersController.put('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const userToUpdate = req.body;
        yield user_1.userService.put(id, userToUpdate),
            res.status(200).send('User successfully updated');
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));
exports.usersController.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        yield user_1.userService.delete(id);
        res.status(200).send('User successfully deleted');
    }
    catch (error) {
        res.status(500).send(`${error}`);
    }
}));