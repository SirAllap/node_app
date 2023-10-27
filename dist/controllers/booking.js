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
exports.bookingsController = void 0;
const express_1 = require("express");
const booking_1 = require("../services/booking");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.fetchAll();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.get('/:bookingId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.fetchOne(req.params.bookingId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield booking_1.bookingService.createOne(req.body);
        res.json({ message: 'Booking successfully created' });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.put('/:bookingId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId;
        const bookingToUpdate = req.body;
        yield booking_1.bookingService.updateOne(id, bookingToUpdate),
            res.json({ message: 'Booking successfully updated' });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.delete('/:bookingId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId;
        yield booking_1.bookingService.destroyOne(id);
        res.json({ message: 'Booking successfully deleted' });
    }
    catch (error) {
        next(error);
    }
}));
