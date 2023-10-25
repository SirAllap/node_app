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
exports.roomService = exports.rooms = void 0;
const rooms_json_1 = __importDefault(require("../data/rooms.json"));
exports.rooms = rooms_json_1.default;
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.rooms;
        if (!result)
            throw new Error('Error obtaining all rooms');
        return result;
    });
}
function getById(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = roomId.toString();
        const result = yield exports.rooms.filter((room) => room.id === id);
        if (result.length === 0)
            throw new Error('Bad request');
        return result;
    });
}
function post(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentRoomLenght = exports.rooms.length;
        const result = yield exports.rooms.push(room);
        if (currentRoomLenght === exports.rooms.length)
            throw new Error('Error posting new room');
        return result;
    });
}
function put(roomId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = roomId.toString();
        const currentObjectIndex = exports.rooms.findIndex((room) => room.id === id);
        const result = (exports.rooms[currentObjectIndex] = Object.assign(Object.assign({}, exports.rooms[currentObjectIndex]), update));
        if (currentObjectIndex === -1)
            throw new Error('Booking not found');
        return result;
    });
}
function _delete(roomId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = roomId.toString();
        const currentObjectIndex = exports.rooms.findIndex((room) => room.id === id);
        const result = yield exports.rooms.splice(currentObjectIndex, 1);
        if (currentObjectIndex === -1)
            throw new Error('Booking not found');
        return result;
    });
}
exports.roomService = {
    get,
    getById,
    post,
    put,
    delete: _delete,
};
