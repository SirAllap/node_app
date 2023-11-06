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
const util_1 = require("../util/util");
exports.rooms = rooms_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)('SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities FROM room r LEFT JOIN photo p ON r.id = p.room_id LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id LEFT JOIN amenity a ON ahr.amenity_id = a.id GROUP BY r.id;');
    return result;
});
const fetchOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities FROM room r LEFT JOIN photo p ON r.id = p.room_id LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id LEFT JOIN amenity a ON ahr.amenity_id = a.id WHERE r.id = ${roomId} GROUP BY r.id;`);
    return result;
});
const createOne = (room) => __awaiter(void 0, void 0, void 0, function* () {
    const currentRoomLenght = exports.rooms.length;
    const result = yield exports.rooms.push(room);
    if (currentRoomLenght === exports.rooms.length)
        throw new Error('Error posting new room');
    return result;
});
const updateOne = (roomId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const id = roomId.toString();
    const currentObjectIndex = exports.rooms.findIndex((room) => room.id === id);
    if (currentObjectIndex === -1)
        throw new Error('Booking not found');
    const result = (exports.rooms[currentObjectIndex] = Object.assign(Object.assign({}, exports.rooms[currentObjectIndex]), update));
    return result;
});
const destroyOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`DELETE FROM room WHERE id = ${roomId};`);
    return result;
});
exports.roomService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
