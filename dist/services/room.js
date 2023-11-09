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
exports.roomService = void 0;

const util_1 = require("../util/util");
const fetchAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities
	FROM room r LEFT JOIN photo p ON r.id = p.room_id
	LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id
	LEFT JOIN amenity a ON ahr.amenity_id = a.id
	GROUP BY r.id;
	`;
    const result = yield (0, util_1.SelectQuery)(query);
    return result;
});
const fetchOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities
	FROM room r
	LEFT JOIN photo p ON r.id = p.room_id
	LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id
	LEFT JOIN amenity a ON ahr.amenity_id = a.id WHERE r.id=?
	GROUP BY r.id;
	`;
    const params = [roomId];
    const result = yield (0, util_1.SelectQuery)(query, params);
    return result;
});
const createOne = (room) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status)
	VALUES (?, ?, ?, ?, ?, ?, ?);
	`;
    const params = [
        room.room_number,
        room.room_type,
        room.description,
        room.price,
        room.offer_price,
        room.discount,
        room.status,
    ];
    const result = yield (0, util_1.ModifyQuery)(query, params);
    console.log(result);
    if (result.affectedRows === 0)
        throw new Error('Nothing has been created');
    const createdRoom = yield fetchOne(result.insertId);
    return createdRoom;
});
const updateOne = (roomId, update) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	UPDATE room
	SET room_number=?, room_type=?, description=?, price=?, offer_price=?, discount=?, status=?
	WHERE id=?;
	`;
    const params = [
        update.room_number,
        update.room_type,
        update.description,
        update.price,
        update.offer_price,
        update.discount,
        update.status,
        roomId,
    ];
    const result = yield (0, util_1.ModifyQuery)(query, params);
    return result;
});
const destroyOne = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
	DELETE FROM room WHERE id=?;
	`;
    const params = [roomId];
    const result = yield (0, util_1.SelectQuery)(query, params);

    return result;
});
exports.roomService = {
    fetchAll,
    fetchOne,
    createOne,
    updateOne,
    destroyOne,
};
