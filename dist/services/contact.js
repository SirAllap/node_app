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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = exports.contacts = void 0;
const client_review_json_1 = __importDefault(require("../data/client_review.json"));
const contact_model_1 = require("../models/contact.model");
exports.contacts = client_review_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.contactModel.find();
    if (result.length === 0)
        throw new Error('There is no contacts in the database.');
    return result;
});
const fetchOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.contactModel.findById(contactId);
    if (!result)
        throw new Error('There is no contact with that ID in the database.');
    return result;
});
const createOne = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.contactModel.create(contact);
    return result;
});
const updateOne = (contactId, update) => __awaiter(void 0, void 0, void 0, function* () {
    yield contact_model_1.contactModel.findByIdAndUpdate(contactId, update);
    const result = yield contact_model_1.contactModel.findById(contactId);
    return result;
});
const destroyOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield contact_model_1.contactModel.findByIdAndDelete(contactId);
    return result;
});
exports.contactService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
