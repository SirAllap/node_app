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
exports.bookingService = exports.bookings = void 0;
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
const util_1 = require("../util/util");
exports.bookings = bookings_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)('SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b LEFT JOIN room r ON b.room_id = r.id LEFT JOIN photo p ON r.id = p.room_id GROUP BY b.id, r.room_number, r.room_type;');
    return result;
});
const fetchOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b LEFT JOIN room r ON b.room_id = r.id LEFT JOIN photo p ON r.id = p.room_id WHERE b.id = ${bookingId} GROUP BY b.id, r.room_number, r.room_type;`);
    return result;
});
const createOne = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBoookingLength = exports.bookings.length;
    const result = yield exports.bookings.push(booking);
    if (currentBoookingLength === exports.bookings.length)
        throw new Error('Error posting new booking');
    return result;
});
const updateOne = (bookingId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const id = bookingId.toString();
    const currentObjectIndex = exports.bookings.findIndex((booking) => booking.id === id);
    if (currentObjectIndex === -1)
        throw new Error('Booking not found');
    const result = (exports.bookings[currentObjectIndex] = Object.assign(Object.assign({}, exports.bookings[currentObjectIndex]), update));
    return result;
});
const destroyOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`DELETE FROM booking WHERE id = ${bookingId};`);
    return result;
});
exports.bookingService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
