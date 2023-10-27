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
const booking_model_1 = require("../models/booking.model");
exports.bookings = bookings_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.bookingModel.find();
    return result;
});
const fetchOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.bookingModel.findById(bookingId);
    if (!result)
        throw new Error('There is no booking with that ID in the database.');
    return result;
});
const createOne = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.bookingModel.create(booking);
    return result;
});
const updateOne = (bookingId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.bookingModel.findByIdAndUpdate(bookingId, update);
    return result;
});
const destroyOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.bookingModel.findByIdAndDelete(bookingId);
    return result;
});
exports.bookingService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
