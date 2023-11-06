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
const util_1 = require("../util/util");
exports.contacts = client_review_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)('SELECT * FROM contact;');
    return result;
});
const fetchOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`SELECT * FROM contact WHERE id = ${contactId};`);
    return result;
});
const createOne = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    const currentContactLength = exports.contacts.length;
    const result = yield exports.contacts.push(contact);
    if (currentContactLength === exports.contacts.length)
        throw new Error('Error posting new contact');
    return result;
});
const updateOne = (contactId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const id = contactId.toString();
    const currentObjectIndex = exports.contacts.findIndex((contact) => contact.id === id);
    if (currentObjectIndex === -1)
        throw new Error('contact not found');
    const result = (exports.contacts[currentObjectIndex] = Object.assign(Object.assign({}, exports.contacts[currentObjectIndex]), update));
    return result;
});
const destroyOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`DELETE FROM contact WHERE id = ${contactId};`);
    return result;
});
exports.contactService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
