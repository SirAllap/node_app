"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClientModel = void 0;
const mongoose_1 = require("mongoose");
const userClientSchema = new mongoose_1.Schema({
    full_name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    photo: { type: String, required: false },
    phone_number: { type: String, required: true },
});
exports.UserClientModel = (0, mongoose_1.model)('usersClient', userClientSchema);
