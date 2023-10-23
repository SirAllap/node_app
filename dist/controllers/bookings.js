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
exports.bookingsController = void 0;
const express_1 = require("express");
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(bookings_json_1.default);
    }
    catch (error) {
        res.status(500).send(`Error obtaining all bookings: ${error}`);
    }
}));
exports.bookingsController.get('/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId.toString();
        const data = bookings_json_1.default.filter((booking) => booking.id === id);
        res.send(data);
    }
    catch (error) {
        res.status(500).send(`Error obtaining the booking: ${error}`);
    }
}));
exports.bookingsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        bookings_json_1.default.push(req.body);
        res.send(bookings_json_1.default);
    }
    catch (error) {
        res.status(500).send(`Error posting new booking: ${error}`);
    }
}));
exports.bookingsController.put('/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId.toString();
        const data = bookings_json_1.default.filter((booking) => booking.id !== id);
        const result = Object.assign(Object.assign({}, data), req.body);
        res.send(result);
    }
    catch (error) {
        res.status(500).send(`Error posting new booking: ${error}`);
    }
}));
//# sourceMappingURL=bookings.js.map