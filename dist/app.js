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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("dotenv/config");
const auth_1 = require("./middlewares/auth");
const api_info_json_1 = __importDefault(require("./data/api_info.json"));
const auth_2 = require("./controllers/auth");
const booking_1 = require("./controllers/booking");
const room_1 = require("./controllers/room");
const contact_1 = require("./controllers/contact");
const user_1 = require("./controllers/user");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const URI = process.env.MONGO_URI || '';
    // const URI_ATLAS: string = process.env.MONGO_ATLAS_URI || ''
    try {
        yield (0, mongoose_1.connect)(URI, {
            dbName: process.env.MONGO_DB || 'Dashboard-api',
        });
        console.log('Connected to MongoDB');
    }
    catch (err) {
        throw new Error(`Error connecting to MongoDB: ${err}`);
    }
}))();
// middlewares & router
exports.app = (0, express_1.default)()
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use((0, morgan_1.default)('combined'))
    .use('/api-info', (_req, res) => res.json({ api_info: api_info_json_1.default }))
    .use('/login', auth_2.authController)
    .use(auth_1.authMiddleware)
    .use('/bookings', booking_1.bookingsController)
    .use('/rooms', room_1.roomsController)
    .use('/contacts', contact_1.contactsController)
    .use('/users', user_1.usersController)
    .use((err, _req, res, _next) => {
    console.error(err);
    return res
        .status(500)
        .json({ error: true, message: 'Application error' });
});
