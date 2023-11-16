"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomModel = void 0;
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    room_number: { type: String, required: true },
    room_photo: { type: [String], required: true },
    room_type: { type: String, required: true },
    description: { type: String, required: true },
    amenities_type: { type: String, required: true },
    amenities: {
        type: [{ name: String, description: String }],
        required: true,
    },
    price: { type: Number, required: true },
    offer_price: { type: Boolean, required: true },
    discount: { type: Number, required: true },
    status: { type: String, required: true },
});
exports.RoomModel = (0, mongoose_1.model)('rooms', roomSchema);
