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
exports.SelectQuery = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
require("dotenv/config");
const host = process.env.SQL_HOST;
const user = process.env.SQL_USER;
const database = process.env.SQL_DATABASE;
const pass = process.env.SQL_PASSWORD;
const access = {
    host: host,
    user: user,
    database: database,
    password: pass,
};
const pool = promise_1.default.createPool(access);
const SelectQuery = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield pool.execute(query);
    return results;
});
exports.SelectQuery = SelectQuery;
// export const SelectQuery = async (query: string, params: any[] = []) => {
// 	const [results] = await pool.execute(query, params)
// 	return results
// }
