"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
    reference_number: { type: String, required: false },
    roomId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'rooms',
    },
});
exports.BookingModel = (0, mongoose_1.model)('bookings', bookingSchema);
