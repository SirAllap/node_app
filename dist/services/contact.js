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
exports.contactService = void 0;
const util_1 = require("../util/util");
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	SELECT * 
	FROM contact;
	`;
    const result = yield (0, util_1.SelectQuery)(query);
    return result;
});
const fetchOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	SELECT * 
	FROM contact;
	`;
    const params = [contactId];
    const result = yield (0, util_1.SelectQuery)(query, params);
    return result;
});
const createOne = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status)
	VALUES (?, ?, ?, ?, ?, ?);
	`;
    const params = [
        contact.full_name,
        contact.email,
        contact.phone_number,
        contact.subject_of_review,
        contact.review_body,
        contact.date,
        contact.status,
    ];
    const result = (0, util_1.ModifyQuery)(query, params);
    return result;
});
const updateOne = (contactId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	UPDATE contact
	SET full_name = ?, email = ?, phone_number = ?, subject_of_review = ?, review_body = ?, date = ?, status = ?
	WHERE id = ?;
	`;
    const params = [
        update.full_name,
        update.email,
        update.phone_number,
        update.subject_of_review,
        update.review_body,
        update.date,
        update.status,
        contactId,
    ];
    const result = (0, util_1.ModifyQuery)(query, params);
    return result;
});
const destroyOne = (contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	DELETE FROM contact
	WHERE id=?;`;
    const params = [contactId];
    const result = yield (0, util_1.SelectQuery)(query, params);
    return result;
});
exports.contactService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
