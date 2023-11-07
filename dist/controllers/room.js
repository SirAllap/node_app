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
exports.roomsController = void 0;
const express_1 = require("express");
const room_1 = require("../services/room");
exports.roomsController = (0, express_1.Router)();
exports.roomsController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield room_1.roomService.fetchAll();
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.roomsController.get('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield room_1.roomService.fetchOne(req.params.roomId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.roomsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoom = Object.assign({}, req.body);
        yield room_1.roomService.createOne(newRoom);
        res.json('Room successfully created');
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.roomsController.put('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.roomId;
        const roomToUpdate = Object.assign({}, req.body);
        yield room_1.roomService.updateOne(id, roomToUpdate),
            res.json('Room successfully updated');
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.roomsController.delete('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.roomId;
        yield room_1.roomService.destroyOne(id);
        res.json('Room successfully deleted');
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
