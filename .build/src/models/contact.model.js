"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModel = void 0;
const mongoose_1 = require("mongoose");
const contacSchema = new mongoose_1.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    subject_of_review: { type: String, required: true },
    review_body: { type: String, required: true },
    date: { type: String, required: true },
    dateTime: { type: String, required: true },
    isArchived: { type: String, required: true },
});
exports.ContactModel = (0, mongoose_1.model)('contacts', contacSchema);
