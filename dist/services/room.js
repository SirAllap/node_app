"use strict"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
        function rejected(value) { try { step(generator["throw"](value)) } catch (e) { reject(e) } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
}
Object.defineProperty(exports, "__esModule", { value: true })
exports.roomService = void 0
const room_model_1 = require("../models/room.model")
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.RoomModel.find()
    if (result.length === 0)
        throw new Error('There is no rooms in the database.')
    return result
})
const fetchOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.RoomModel.findById(roomId)
    if (!result)
        throw new Error('There is no room with that ID in the database.')
    return result
})
const createOne = (room) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.RoomModel.create(room)
    return result
})
const updateOne = (roomId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.RoomModel.findByIdAndUpdate(roomId, update, {
        new: true,
    })
    if (!result) {
        throw new Error()
    }
    return result
})
const destroyOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.RoomModel.findByIdAndDelete(roomId)
    if (!result) {
        throw new Error()
    }
    return result
})
exports.roomService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
}
