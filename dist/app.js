"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const booking_1 = require("./controllers/booking");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const room_1 = require("./controllers/room");
// middlewares & router
exports.app = (0, express_1.default)()
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use((0, morgan_1.default)('combined'))
    .use('/bookings', booking_1.bookingsController)
    .use('/rooms', room_1.roomsController)
    .use((err, _req, res, _next) => {
    console.error(err);
    return res
        .status(500)
        .json({ error: true, message: 'Application error' });
});
