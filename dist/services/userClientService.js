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
exports.userClientService = void 0;
const userClient_model_1 = require("../models/userClient.model");
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userClient_model_1.UserClientModel.find({}, { password: 0 });
    if (result.length === 0)
        throw new Error('There is no users in the database.');
    return result;
});
const fetchOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userClient_model_1.UserClientModel.findById(userId, { password: 0 });
    if (!result)
        throw new Error('There is no user with that ID in the database.');
    return result;
});
const updateOne = (contactId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userClient_model_1.UserClientModel.findByIdAndUpdate(contactId, update, {
        new: true,
    });
    if (!result) {
        throw new Error();
    }
    return result;
});
const destroyOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userClient_model_1.UserClientModel.findByIdAndDelete(contactId);
    if (!result) {
        throw new Error();
    }
    return result;
});
exports.userClientService = {
    fetchAll,
    fetchOne,
    updateOne,
    destroyOne,
};
