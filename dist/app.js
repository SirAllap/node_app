"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const booking_1 = require("./controllers/booking");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const room_1 = require("./controllers/room");
exports.app = (0, express_1.default)();
// middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/bookings', booking_1.bookingsController);
exports.app.use('/rooms', room_1.roomsController);
exports.app.use((err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Application error' });
});
