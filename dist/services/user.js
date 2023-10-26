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
exports.users = employee_data_json_1.default;
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.users;
        if (!result)
            throw new Error('Error obtaining all users');
        return result;
    });
}
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = userId.toString();
        const result = yield exports.users.filter((user) => user.employee_id === id);
        if (result.length === 0)
            throw new Error('Bad request');
        return result;
    });
}
function post(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUsersLength = exports.users.length;
        const result = yield exports.users.push(user);
        if (currentUsersLength === exports.users.length)
            throw new Error('Error posting new user');
        return result;
    });
}
function put(userId, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = userId.toString();
        const currentObjectIndex = exports.users.findIndex((user) => user.employee_id === id);
        if (currentObjectIndex === -1)
            throw new Error('User not found');
        const result = (exports.users[currentObjectIndex] = Object.assign(Object.assign({}, exports.users[currentObjectIndex]), update));
        return result;
    });
}
function _delete(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = userId.toString();
        const currentObjectIndex = exports.users.findIndex((user) => user.employee_id === id);
        if (currentObjectIndex === -1)
            throw new Error('User not found');
        const result = yield exports.users.splice(currentObjectIndex, 1);
        return result;
    });
}
exports.userService = {
    get,
    getById,
    post,
    put,
    delete: _delete,
};
