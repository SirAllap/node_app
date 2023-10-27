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
const room_model_1 = require("../models/room.model");
exports.rooms = rooms_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.roomModel.find();
    if (result.length === 0)
        throw new Error('There is no rooms in the database.');
    return result;
});
const fetchOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.roomModel.findById(roomId);
    if (!result)
        throw new Error('There is no room with that ID in the database.');
    return result;
});
const createOne = (room) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.roomModel.create(room);
    return result;
});
const updateOne = (roomId, update) => __awaiter(void 0, void 0, void 0, function* () {
    yield room_model_1.roomModel.findByIdAndUpdate(roomId, update);
    const result = yield room_model_1.roomModel.findById(roomId);
    return result;
});
const destroyOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.roomModel.findByIdAndDelete(roomId);
    return result;
});
exports.roomService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
