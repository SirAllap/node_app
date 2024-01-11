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
exports.bookingService = void 0;
const booking_model_1 = require("../models/booking.model");
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.find();
    if (result.length === 0)
        throw new Error('There is no bookings in the database.');
    return result;
});
const fetchOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findById(bookingId).populate({
        path: 'roomId',
        model: 'rooms',
    });
    if (!result)
        throw new Error('There is no booking with that ID in the database.');
    return result;
});
const fetchOneByRefNumber = (reference_number) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findOne({
        reference_number: reference_number,
    }).populate({
        path: 'roomId',
        model: 'rooms',
    });
    if (!result)
        throw new Error('There is no booking with that reference number in the database.');
    return result;
});
const createOne = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.create(booking);
    return result;
});
const updateOne = (bookingId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findByIdAndUpdate(bookingId, update, {
        new: true,
    });
    if (!result) {
        throw new Error();
    }
    return result;
});
const destroyOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel.findByIdAndDelete(bookingId);
    if (!result) {
        throw new Error();
    }
    return result;
});
exports.bookingService = {
    fetchAll,
    fetchOne,
    fetchOneByRefNumber,
    createOne,
    updateOne,
    destroyOne,
};
