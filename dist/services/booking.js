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
exports.bookingService = void 0;
const util_1 = require("../util/util");
// export const bookings = bookingsData as IBooking[]
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)('SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b LEFT JOIN room r ON b.room_id = r.id LEFT JOIN photo p ON r.id = p.room_id GROUP BY b.id, r.room_number, r.room_type;');
    return result;
});
const fetchOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures
                 FROM booking b
                 LEFT JOIN room r ON b.room_id = r.id
                 LEFT JOIN photo p ON r.id = p.room_id
                 WHERE b.id = ${bookingId}
                 GROUP BY b.id, r.room_number, r.room_type;`;
    const result = yield (0, util_1.SelectQuery)(query);
    return result;
});
const createOne = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
	VALUES ('${booking.guest}', '${booking.phone_number}', '${booking.order_date}', '${booking.check_in}', '${booking.check_out}', '${booking.special_request}', '${booking.status}', ${booking.room_id});
	`;
    const result = yield (0, util_1.SelectQuery)(query);
    return result;
});
const updateOne = (bookingId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	UPDATE booking
	SET guest='${update.guest}', phone_number='${update.phone_number}', order_date='${update.order_date}', check_in='${update.check_in}', check_out='${update.check_out}', special_request='${update.special_request}', status='${update.status}', room_id=${update.room_id}
	WHERE id = ${bookingId};
	`;
    const result = yield (0, util_1.SelectQuery)(query);
    return result;
});
const destroyOne = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, util_1.SelectQuery)(`DELETE FROM booking WHERE id = ${bookingId};`);
    return result;
});
exports.bookingService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
