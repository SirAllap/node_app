"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = exports.userSchema = exports.roomSchema = exports.bookingSchema = exports.authSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.authSchema = joi_1.default.object({
    user: joi_1.default.string().alphanum().min(3).max(10).required(),
    pass: joi_1.default.string()
        .min(3)
        .max(10)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
exports.bookingSchema = joi_1.default.object({
    guest: joi_1.default.string().alphanum().required(),
    phone_number: joi_1.default.string().required(),
    order_date: joi_1.default.date()
        .required()
        .min(new Date().toISOString().split('T')[0]),
    check_in: joi_1.default.date()
        .required()
        .greater(joi_1.default.ref('order_date'))
        .message('The check in date must be greater than the order date'),
    check_out: joi_1.default.date()
        .required()
        .greater(joi_1.default.ref('check_in'))
        .message('The check in date must be greater than the order date'),
    special_request: joi_1.default.string().required().min(1).max(150),
    status: joi_1.default.string()
        .required()
        .valid('Check In', 'Check Out', 'In Progress'),
    room_id: joi_1.default.number().required(),
});
exports.roomSchema = joi_1.default.object({
    room_number: joi_1.default.string().required(),
    room_type: joi_1.default.string()
        .required()
        .valid('Single Bed', 'Double Bed', 'Double Superior', 'Suite'),
    description: joi_1.default.string().required().min(1).max(1650),
    price: joi_1.default.number().required(),
    offer_price: joi_1.default.boolean().required().valid(true, false),
    discount: joi_1.default.number().required().valid(0, 5, 10, 15, 20),
    status: joi_1.default.string().required().valid('Available', 'Booked'),
});
exports.userSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    photo: joi_1.default.string().required(),
    start_date: joi_1.default.date()
        .required()
        .min(new Date().toISOString().split('T')[0]),
    description: joi_1.default.string().required().min(1).max(150),
    phone_number: joi_1.default.string().required(),
    status: joi_1.default.string().required().valid('Active', 'Inactive'),
});
exports.contactSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    phone_number: joi_1.default.string().required(),
    subject_of_review: joi_1.default.string().required().min(1).max(50),
    review_body: joi_1.default.string().required().min(1).max(450),
    date: joi_1.default.date().required().min(new Date().toISOString().split('T')[0]),
    status: joi_1.default.string().required().valid('Not Archived', 'Archived'),
});
