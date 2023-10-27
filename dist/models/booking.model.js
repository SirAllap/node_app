"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingModel = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    guest: { type: String, required: true },
    phone_number: { type: String, required: true },
    order_date: { type: String, required: true },
    check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    special_request: { type: String, required: true },
    room_type: { type: String, required: true },
    room_number: { type: String, required: true },
    status: { type: String, required: true },
    photos: { type: [String], required: true },
});
exports.bookingModel = (0, mongoose_1.model)('booking', bookingSchema);
