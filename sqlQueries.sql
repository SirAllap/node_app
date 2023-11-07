CREATE SCHEMA IF NOT EXISTS travl_db DEFAULT CHARACTER SET utf8 ;
USE travl_db ;

-- -----------------------------------------------------
-- Table `room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `room` (
`id` INT NOT NULL AUTO_INCREMENT,
`room_number` INT NOT NULL,
`room_type` VARCHAR(45) NOT NULL,
`description` VARCHAR(255) NOT NULL,
`price` INT NOT NULL,
`offer_price` TINYINT(1) NOT NULL,
`discount` INT NOT NULL,
`status` VARCHAR(45) NOT NULL,
PRIMARY KEY(`id`));

-- -----------------------------------------------------
-- Table `booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking` (
`id` INT NOT NULL AUTO_INCREMENT,
`guest` VARCHAR(255) NOT NULL,
`phone_number` VARCHAR(45) NOT NULL,
`order_date` DATE NOT NULL,
`check_in` DATE NOT NULL,
`check_out` DATE NOT NULL,
`special_request` VARCHAR(255) NOT NULL,
`status` VARCHAR(45) NOT NULL,
`room_id` INT NOT NULL,
PRIMARY KEY(`id`),
FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
`id` INT NOT NULL AUTO_INCREMENT,
`full_name` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`photo` VARCHAR(255) NOT NULL,
`start_date` DATE NOT NULL,
`description` VARCHAR(255) NOT NULL,
`phone_number` VARCHAR(45) NOT NULL,
`status` VARCHAR(45) NOT NULL,
PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact` (
`id` INT NOT NULL AUTO_INCREMENT,
`full_name` VARCHAR(255) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`phone_number` VARCHAR(45) NOT NULL,
`subject_of_review` VARCHAR(255) NOT NULL,
`review_body` VARCHAR(255) NOT NULL,
`date` DATE NOT NULL,
`status` VARCHAR(45) NOT NULL,
PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `photo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `photo` (
`id` INT NOT NULL AUTO_INCREMENT,
`photos` VARCHAR(255) NOT NULL,
`room_id` INT NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `photo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amenity` (
`id` INT NOT NULL AUTO_INCREMENT,
`amenities` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `amenities_has_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amenities_has_room` (
`room_id` INT NOT NULL,
`amenity_id` INT NOT NULL,
FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`amenity_id`) REFERENCES `amenity` (`id`), 
PRIMARY KEY (`room_id`, `amenity_id`));

-- ----------------------------------------------------------------------
-- ------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------
-- DB QUERIES
-- ----------------------------------------------------------------------
-- ------------------------------------------------------------------------------------
-- ---------------------------------------------------------------------- 

USE travl_db;

-- ---------
-- Fetch all amenities
-- ---------
SELECT * FROM amenity;
-- ---------
-- Delete amenities by multiple ID's
-- ---------
DELETE FROM amenity WHERE id IN (11, 12, 13, 14, 15, 16, 17, 18, 19, 20);
-- ---------
-- Create amenities
-- ---------
INSERT INTO amenity (amenities) 
VALUES ('Free Wifi'), ('Towels'), ('Mini Bar'), ('Coffee Set'), ('Nice Views'), ('1/3 Bed Space'), ('24-Hour Guard'), ('Air Conditioner'), ('Television'), ('Coffee Set');

-- ---------
-- Fetch all contact
-- ---------
SELECT * FROM contact;
-- ---------
-- Create contact
-- ---------
INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES ('David Pallarés Robaina', 'sirallap@gmail.com', '+34638492817', 'Great Service', 'The hotel has the best towels I`ve ever touched', '2023-12-30', 'Active');
INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES ('Sarah Johnson', 'sarah.johnson@email.com', '+1234567890', 'Excellent Food', 'I had an amazing dining experience at the restaurant. The food was outstanding!', '2023-11-15', 'Active');
INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES ('Michael Smith', 'michael.smith@email.com', '+9876543210', 'Friendly Staff', 'The staff at the hotel were incredibly friendly and helpful. I felt welcomed from the moment I arrived.', '2023-11-20', 'Active');
INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES ('Linda Martinez', 'linda.martinez@email.com', '+5551234567', 'Clean Rooms', 'The rooms were spotlessly clean, and I appreciated the attention to detail in maintaining cleanliness.', '2023-11-25', 'Active');
INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES ('John Anderson', 'john.anderson@email.com', '+7890123456', 'Beautiful Location', 'The hotel is situated in a beautiful location with breathtaking views. It made my stay truly memorable.', '2023-12-02', 'Active');
INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES ('Mary Brown', 'mary.brown@email.com', '+1237894560', 'Efficient Service', 'The hotels service was efficient, and I was impressed with how smoothly everything ran during my stay.', '2023-12-10', 'Active');
-- ---------
-- Fetch all user
-- ---------
SELECT * FROM user;
-- ---------
-- Create user
-- ---------
INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) 
VALUES ('Pepito The Coder', 'pepito@gmail.com', 'http://url.com', '2023-09-30', 'Hotel Director', '+34 666555888', 'Active');

-- ---------
-- Fetch all room
-- ---------
SELECT * FROM room;
-- ---------
-- Delete one room by id
-- ---------
DELETE FROM room WHERE id = 8;
-- ---------
-- Create room
-- ---------
INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status) 
VALUES (109, 'Double Bed', 'Big Double Bed Room', 320, true, 15, 'Available'),
(205, 'Single Bed', 'Single Bed Room', 120, false, 0, 'Available'),
(101, 'Double Bed', 'Big Double Bed Room', 350, true, 20, 'Booked'),
(910, 'Suite', 'King Suite Honey Moon', 820, false, 0, 'Booked'),
(603, 'Double Superior', 'Big Double Superior Bed Room', 420, true, 5, 'Available');
INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status) 
VALUES (910, 'Suite', 'King Suite Honey Moon', 820, false, 0, 'Booked');
-- ---------
-- Update room by id
-- ---------
UPDATE room 
SET room_number = 514, room_type = 'Suite', description = 'Massive Suite', price = 790, offer_price  = true, discount = 5, status = 'Booked' 
WHERE id = 1;

-- ---------
-- Fetch all amenities_has_room
-- ---------
SELECT * FROM amenities_has_room;
-- ---------
-- Fetch amenities_has_room relation amenitie(N-1)room
-- ---------
INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (1, 2), (1, 3), (1, 5), (1, 1);
INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (3, 2), (3, 3), (3, 5), (3, 1);
INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (4, 2), (4, 3), (4, 5), (4, 1);
INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (5, 2), (5, 3), (5, 5), (5, 1);
INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (7, 2), (7, 3), (7, 5), (7, 1);

-- ---------
-- Fetch all photo
-- ---------
SELECT * FROM photo;
-- ---------
-- Create photo
-- ---------
INSERT INTO photo (photos,room_id) 
VALUES ('http//:urlDeRoom.com', 1),
 ('http//:urlDeRoom.com', 3),
 ('http//:urlDeRoom.com', 5),
 ('http//:urlDeRoom.com', 4),
 ('http//:urlDeRoom.com', 6);
INSERT INTO photo (photos,room_id) 
VALUES ('http//:urlDeRoom.com', 7), ('http//:urlDeRoom1.com', 7), ('http//:urlDeRoom2.com', 7);

-- ---------
-- Fetch one room by room_number
-- ---------
SELECT * FROM room WHERE room_number = 910;

-- ---------
-- Fetch room_number & photos & photo_id by room number
-- ---------
SELECT r.room_number, p.photos, p.id
FROM room r
LEFT JOIN photo p on r.id = p.room_id
WHERE room_number = 910;

-- ---------
-- Fetch room_number & amenities by room number
-- ---------
SELECT r.room_number, a.amenities
FROM room r
LEFT JOIN amenities_has_room ahr on r.id = ahr.room_id
LEFT JOIN amenity a on ahr.amenity_id = a.id
WHERE room_number = 910;

-- ---------
-- Fetch all rooms & photos & amenities
-- ---------
SELECT r.*, p.photos, a.amenities
FROM room r
LEFT JOIN photo p on r.id = p.room_id
LEFT JOIN amenities_has_room ahr on r.id = ahr.room_id
LEFT JOIN amenity a on ahr.amenity_id = a.id;

-- ---------
-- Fetch room_number & amenities by room number AND try to group by photos AND amenities
-- ---------
SELECT r.*, GROUP_CONCAT(DISTINCT p.photos) AS all_photos, GROUP_CONCAT(a.amenities) AS all_amenities
FROM room r
LEFT JOIN photo p ON r.id = p.room_id
LEFT JOIN amenities_has_room ahr ON r.id = ahr.room_id
LEFT JOIN amenity a ON ahr.amenity_id = a.id
WHERE r.id = 1
GROUP BY r.id;

-- ---------
-- Fetch all bookings
-- ---------
SELECT * FROM booking;
-- ---------
-- Delete booking by id
-- ---------
DELETE FROM booking WHERE id = 6;
-- ---------
-- Create booking
-- ---------
INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) VALUES ('Perico El Flaco', '+34777888777', '2023-05-25', '2023-10-05', '2023-10-15', 'I would like to have XXL towels', 'In Progress', 1);

INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
VALUES ('Luna The Doggy', '+34333222444', '2023-06-10', '2023-09-20', '2023-09-30', 'Extra doggy food', 'In Progress', 3);

INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
VALUES ('David Pallarés Robaina', '+34111222333', '2023-03-15', '2023-07-15', '2023-07-25', 'Nice views', 'In Progress', 4);

INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
VALUES ('Blacky The Cat', '+34333222333', '2023-01-12', '2023-03-05', '2023-03-15', 'Extra cat food', 'In Progress', 6);

INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
VALUES ('Lola Medina', '+34111555333', '2023-02-15', '2023-04-07', '2023-04-25', 'I would like to have hot doggy food', 'In Progress', 7);

-- ---------
-- Fetch all bookings & room_number & room_type AND group by photos
-- ---------
SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures
FROM booking b
LEFT JOIN room r ON b.room_id = r.id
LEFT JOIN photo p ON r.id = p.room_id
GROUP BY b.id, r.room_number, r.room_type;


