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
exports.bookings = exports.bookingsController = void 0;
const express_1 = require("express");
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
const booking_1 = require("../services/booking");
exports.bookingsController = (0, express_1.Router)();
exports.bookings = bookings_json_1.default;
exports.bookingsController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.get();
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error obtaining all bookings: ${error}`);
    }
}));
exports.bookingsController.get('/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.getById(req.params.bookingId);
        if (result.length !== 0) {
            res.send(result);
        }
        else {
            res.status(500).send('The result is empty');
        }
    }
    catch (error) {
        res.status(500).send(`Error obtaining the booking: ${error}`);
    }
}));
exports.bookingsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.post(req.body);
        res.status(200).send('Booking successfully created');
    }
    catch (error) {
        res.status(500).send(`Error posting new booking: ${error}`);
    }
}));
exports.bookingsController.put('/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId;
        const bookingToUpdate = req.body;
        yield booking_1.bookingService.put(id, bookingToUpdate),
            res.status(200).send('Booking successfully updated');
    }
    catch (error) {
        res.status(500).send(`Booking not found: ${error}`);
    }
}));
exports.bookingsController.delete('/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId;
        const result = yield booking_1.bookingService.delete(id);
        if (result.some((b) => b.id.includes(id.toString()))) {
            res.status(200).send('Booking successfully deleted');
        }
        else {
            res.status(500).send('Booking not found');
        }
    }
    catch (error) {
        res.status(500).send(`Booking not found: ${error}`);
    }
}));
//# sourceMappingURL=booking.js.map