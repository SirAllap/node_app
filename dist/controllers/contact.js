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
exports.contactsController = (0, express_1.Router)();
exports.contactsController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.fetchAll();
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.contactsController.get('/:contactId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.fetchOne(req.params.contactId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
}));
exports.contactsController.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.createOne(req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.contactsController.put('/:contactId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.updateOne(req.params.contactId, req.body);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
exports.contactsController.delete('/:contactId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield contact_1.contactService.destroyOne(req.params.contactId);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
}));
