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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactsController = void 0;
const express_1 = require("express");
const contact_1 = require("../services/contact");
const validation_1 = require("../validators/validation");
const schemas_1 = require("../validators/schemas");
exports.contactsController = (0, express_1.Router)();
exports.contactsController.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.fetchAll();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.contactsController.get('/:contactId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.fetchOne(req.params.contactId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.contactsController.post('/', (0, validation_1.validateOject)(schemas_1.contactSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newContact = Object.assign({}, req.body);
        yield contact_1.contactService.createOne(newContact);
        res.json(req.body);
    }
    catch (error) {
        next(error);
    }
}));
exports.contactsController.put('/:contactId', (0, validation_1.validateOject)(schemas_1.contactSchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.contactId;
        const contactToUpdate = Object.assign({}, req.body);
        yield contact_1.contactService.updateOne(id, contactToUpdate);
        res.json('Contact successfully updated');
    }
    catch (error) {
        next(error);
    }
}));
exports.contactsController.delete('/:contactId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.contactId;
        yield contact_1.contactService.destroyOne(id);
        res.json('Contact successfully deleted');
    }
    catch (error) {
        next(error);
    }
}));
