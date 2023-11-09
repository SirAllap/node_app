"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    full_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String, required: true },
    start_date: { type: String, required: true },
    description: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, required: true },
});
exports.userModel = (0, mongoose_1.model)('users', userSchema);
