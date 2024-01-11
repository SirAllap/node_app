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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const mongoose_1 = __importDefault(require("mongoose"));
describe('Login endpoints', () => {
    test('should login', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'david.pr.developer@gmail.com',
            password: 'ilovebaguettes',
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('payload');
    }), 10000);
    test('should NOT login', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'david',
            password: 'pallarés',
        });
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual('Error: Email or password incorrect');
    }));
});
describe('Trying to access a route without login', () => {
    test('should not access to a unathorized route', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/rooms').send();
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({
            error: true,
            message: 'You are not authorized',
        });
    }));
});
describe('Testing /bookings after login', () => {
    let bookingId = '';
    let guestName = '';
    let token = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'david.pr.developer@gmail.com',
            password: 'ilovebaguettes',
        });
        token = res.body.token;
    }));
    test('Should return an array with all bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/bookings').set('token', token);
        bookingId = res.body[0]._id;
        guestName = res.body[0].guest;
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.statusCode).toEqual(200);
    }));
    test('Should return one booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get(`/bookings/${bookingId}`)
            .set('token', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('guest', guestName);
    }));
    test('Should create one booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const booking = {
            guest: 'Blacky TheBlack Cat',
            phone_number: '+34 638-55-33-13',
            order_date: '2023-11-09',
            check_in: '2023-11-18',
            check_out: '2023-11-23',
            special_request: 'I wouled like bunch of food as soon as I arrive the hotel.',
            room_type: 'Double Bed',
            room_number: '905',
            status: 'In Progress',
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/bookings')
            .set('token', token)
            .send(booking);
        // expect(res.body).toEqual({ message: 'Booking successfully created' })
        expect(res.statusCode).toEqual(200);
    }));
    test('Should modify one booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const booking = {
            guest: 'Luna TheWhite Doggy',
            phone_number: '+34 638-55-33-13',
            order_date: '2023-11-09',
            check_in: '2023-11-18',
            check_out: '2023-11-23',
            special_request: 'I wouled like bunch of food as soon as I arrive the hotel.',
            room_type: 'Double Bed',
            room_number: '905',
            status: 'In Progress',
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .put(`/bookings/${bookingId}`)
            .set('token', token)
            .send(booking);
        // expect(res.body).toEqual({ message: 'Booking successfully updated' })
        expect(res.statusCode).toEqual(200);
    }));
    test('Should delete one booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete(`/bookings/${bookingId}`)
            .set('token', token);
        // expect(res.body).toEqual({ message: 'Booking successfully deleted' })
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Testing /rooms after login', () => {
    let token = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'david.pr.developer@gmail.com',
            password: 'ilovebaguettes',
        });
        token = res.body.token;
    }));
    test('Should return all the rooms', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/rooms').set('token', token);
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Testing /contacts after login', () => {
    let token = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'david.pr.developer@gmail.com',
            password: 'ilovebaguettes',
        });
        token = res.body.token;
    }));
    test('Should return all the contacts', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/contacts').set('token', token);
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Testing /users after login', () => {
    let token = '';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post('/login').send({
            email: 'david.pr.developer@gmail.com',
            password: 'ilovebaguettes',
        });
        token = res.body.token;
    }));
    test('Should return all the users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/users').set('token', token);
        expect(res.statusCode).toEqual(200);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
    }
    catch (error) {
        console.log(`
        Error disconecting from mongo:
        ${error}
      `);
        throw error;
    }
}));
