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
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("../models/user.model");
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find({}, { password: 0 });
    if (result.length === 0)
        throw new Error('There is no users in the database.');
    return result;
});
const fetchOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findById(userId, { password: 0 });
    if (!result)
        throw new Error('There is no user with that ID in the database.');
    return result;
});
const createOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.password = bcryptjs_1.default.hashSync(user.password || '', 10);
    const result = yield user_model_1.userModel.create(user);
    return result;
});
const updateOne = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userModel.findByIdAndUpdate(userId, update, {
        new: true,
    });
    const result = yield user_model_1.userModel.findById(userId, { password: 0 });
    return result;
});
const destroyOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findByIdAndDelete(userId, { password: 0 });
    return result;
});
exports.userService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
