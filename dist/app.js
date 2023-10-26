"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_1 = __importDefault(require("./middlewares/auth"));
const hotelInfo_json_1 = __importDefault(require("./data/hotelInfo.json"));
const login_1 = require("./controllers/login");
const booking_1 = require("./controllers/booking");
const room_1 = require("./controllers/room");
const contact_1 = require("./controllers/contact");
const user_1 = require("./controllers/user");
// middlewares & router
exports.app = (0, express_1.default)()
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use((0, morgan_1.default)('combined'))
    .use('/api-info', (_req, res) => res.send(hotelInfo_json_1.default))
    .use('/login', login_1.loginController)
    .use(auth_1.default)
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
