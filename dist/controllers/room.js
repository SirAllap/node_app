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
        const result = yield room_1.roomService.get();
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error obtaining all rooms: ${error}`);
    }
}));
exports.roomsController.get('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield room_1.roomService.getById(req.params.roomId);
        if (result.length !== 0) {
            res.send(result);
        }
        else {
            res.status(500).send('The result is empty');
        }
    }
    catch (error) {
        res.status(500).send(`Error obtaining the roonm: ${error}`);
    }
}));
exports.roomsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield room_1.roomService.post(req.body);
        res.status(200).send('Room successfully created');
    }
    catch (error) {
        res.status(500).send(`Error posting new room: ${error}`);
    }
}));
exports.roomsController.put('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.roomId;
        const roomToUpdate = req.body;
        yield room_1.roomService.put(id, roomToUpdate),
            res.status(200).send('Room successfully updated');
    }
    catch (error) {
        res.status(500).send(`Room not found: ${error}`);
    }
}));
exports.roomsController.delete('/:roomId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.roomId;
        const result = yield room_1.roomService.delete(id);
        if (result.some((room) => room.id.includes(id.toString()))) {
            res.status(200).send('Room successfully deleted');
        }
        else {
            res.status(500).send('Room not found');
        }
    }
    catch (error) {
        res.status(500).send(`Room not found: ${error}`);
    }
}));