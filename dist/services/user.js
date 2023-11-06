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
const util_1 = require("../util/util");
exports.users = employee_data_json_1.default;
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)('SELECT * FROM user;');
    return result;
});
const fetchOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`SELECT * FROM user WHERE id = ${userId};`);
    return result;
});
const createOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUsersLength = exports.users.length;
    const result = yield exports.users.push(user);
    if (currentUsersLength === exports.users.length)
        throw new Error('Error posting new user');
    return result;
});
const updateOne = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userId.toString();
    const currentObjectIndex = exports.users.findIndex((user) => user.employee_id === id);
    if (currentObjectIndex === -1)
        throw new Error('User not found');
    const result = (exports.users[currentObjectIndex] = Object.assign(Object.assign({}, exports.users[currentObjectIndex]), update));
    return result;
});
const destroyOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`DELETE FROM user WHERE id = ${userId};`);
    return result;
});
exports.userService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
