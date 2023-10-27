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
exports.userService = exports.users = void 0;
const employee_data_json_1 = __importDefault(require("../data/employee_data.json"));
const user_model_1 = require("../models/user.model");
exports.users = employee_data_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    if (result.length === 0)
        throw new Error('There is no users in the database.');
    return result;
});
const fetchOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findById(userId);
    if (!result)
        throw new Error('There is no user with that ID in the database.');
    return result;
});
const createOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.create(user);
    return result;
});
const updateOne = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.userModel.findByIdAndUpdate(userId, update, {
        new: true,
    });
    const result = yield user_model_1.userModel.findById(userId);
    return result;
});
const destroyOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findByIdAndDelete(userId);
    return result;
});
exports.userService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
