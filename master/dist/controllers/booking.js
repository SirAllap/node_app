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
const validation_1 = require("../middlewares/validation");
const schemas_1 = require("../validators/schemas");
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.fetchAll();
        res.json({ result });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.get('/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.fetchOne(req.params.bookingId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.bookingsController.post('/', (0, validation_1.validateOject)(schemas_1.bookingSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBooking = Object.assign({}, req.body);
        yield booking_1.bookingService.createOne(newBooking);
        res.json({ message: 'Booking successfully created' });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.put('/:bookingId', (0, validation_1.validateOject)(schemas_1.bookingSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookingId;
        const bookingToUpdate = Object.assign({}, req.body);
        yield booking_1.bookingService.updateOne(id, bookingToUpdate),
            res.json({ message: 'Booking successfully updated' });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookingsController.delete('/:bookingId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield booking_1.bookingService.destroyOne(req.params.bookingId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
