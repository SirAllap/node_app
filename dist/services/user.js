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
exports.userService = void 0;

const util_1 = require("../util/util");
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	SELECT * 
	FROM user;
	`;
    const result = yield (0, util_1.SelectQuery)(query);
    return result;
});
const fetchOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	SELECT * 
	FROM user WHERE id=?;
	`;
    const params = [userId];
    const result = yield (0, util_1.SelectQuery)(query, params);
    return result;
});
const createOne = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) 
	VALUES (?, ?, ?, ?, ?, ?, ?);
	`;
    const params = [
        user.full_name,
        user.email,
        user.photo,
        user.start_date,
        user.description,
        user.phone_number,
        user.status,
    ];
    const result = (0, util_1.ModifyQuery)(query, params);
    return result;
});
const updateOne = (userId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	UPDATE user
	SET full_name=?, email=?, photo=?, start_date=?, description=?, phone_number=?, status=?
	WHERE id=?;
	`;
    const params = [
        update.full_name,
        update.email,
        update.photo,
        update.start_date,
        update.description,
        update.phone_number,
        update.status,
        userId,
    ];
    const result = (0, util_1.ModifyQuery)(query, params);
    return result;
});
const destroyOne = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	DELETE FROM user 
	WHERE id=?;
	`;
    const params = [userId];
    const result = yield (0, util_1.SelectQuery)(query, params);

    return result;
});
exports.userService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
