import { faker } from '@faker-js/faker'
import { modifyQuery, endConection } from './src/util/util'

const loop: number = 10
const loopPlus: number = 60

;(async () => {
	await modifyQuery(`DROP DATABASE travl_db;`)
	await modifyQuery(
		`
        CREATE DATABASE IF NOT EXISTS travl_db;
        `
	)
	await modifyQuery(`USE travl_db;`)
	await modifyQuery(`
	CREATE TABLE IF NOT EXISTS room (
	    id INT NOT NULL AUTO_INCREMENT,
	    room_number INT NOT NULL,
	    room_type VARCHAR(45) NOT NULL,
	    description LONGTEXT NOT NULL,
	    price INT NOT NULL,
	    offer_price BOOLEAN NOT NULL,
	    discount INT NOT NULL,
	    status BOOLEAN NOT NULL,
	    PRIMARY KEY(id));
	`)
	for (let index = 0; index < loop; index++) {
		const query = `
            INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `
		const params = [
			faker.helpers.rangeToNumber({ min: 100, max: 900 }),
			faker.helpers.arrayElement([
				'Single Bed',
				'Double Bed',
				'Double Superior',
				'Suite',
			]),
			faker.lorem.sentence(),
			faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
			faker.helpers.arrayElement([true, false]),
			faker.helpers.arrayElement([0, 5, 10, 20]),
			faker.helpers.arrayElement([true, false]),
		]
		await modifyQuery(query, params)
	}

	await modifyQuery(`
	CREATE TABLE IF NOT EXISTS booking (
        id INT NOT NULL AUTO_INCREMENT,
        guest VARCHAR(255) NOT NULL,
        phone_number VARCHAR(45) NOT NULL,
        order_date DATE NOT NULL,
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        special_request VARCHAR(255) NOT NULL,
        status VARCHAR(45) NOT NULL,
        room_id INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE);
	`)
	for (let index = 0; index < loopPlus; index++) {
		const query = `
        INSERT INTO booking (guest, phone_number, order_date, check_in, check_out, special_request, status, room_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `
		const params = [
			faker.person.fullName(),
			faker.phone.number(),
			faker.date.recent(),
			faker.date.recent(),
			faker.date.recent(),
			faker.lorem.sentence(),
			faker.helpers.arrayElement([
				'Check In',
				'Check Out',
				'In Progress',
			]),
			faker.helpers.rangeToNumber({ min: 1, max: loop }),
		]
		await modifyQuery(query, params)
	}

	await modifyQuery(`
    CREATE TABLE IF NOT EXISTS user (
        id INT NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        photo VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        description VARCHAR(255) NOT NULL,
        phone_number VARCHAR(45) NOT NULL,
        status BOOLEAN NOT NULL,
        PRIMARY KEY (id));
    `)

	for (let index = 0; index < loop; index++) {
		const query = `
            INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `
		const params = [
			faker.person.fullName(),
			faker.internet.email(),
			faker.image.avatar(),
			faker.date.recent(),
			faker.helpers.arrayElement([
				'Hotel Director',
				'Cleaner',
				'Recepcionist',
				'Chef',
				'Kitchen Porter',
			]),
			faker.phone.number(),
			faker.helpers.arrayElement([true, false]),
		]
		await modifyQuery(query, params)
	}

	await modifyQuery(`
    CREATE TABLE IF NOT EXISTS contact (
        id INT NOT NULL AUTO_INCREMENT,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(45) NOT NULL,
        subject_of_review VARCHAR(255) NOT NULL,
        review_body VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        status BOOLEAN NOT NULL,
        PRIMARY KEY (id));
    `)

	for (let index = 0; index < loop; index++) {
		const query = `
	INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status)
	VALUES (?, ?, ?, ?, ?, ?, ?);
	`
		const params = [
			faker.person.fullName(),
			faker.internet.email(),
			faker.phone.number(),
			faker.lorem.sentence(),
			faker.lorem.sentence(),
			faker.date.recent(),
			faker.helpers.arrayElement([true, false]),
		]
		await modifyQuery(query, params)
	}

	await modifyQuery(`
    CREATE TABLE IF NOT EXISTS photo (
        id INT NOT NULL AUTO_INCREMENT,
        URL VARCHAR(255) NOT NULL,
        room_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE);
    `)
	for (let index = 0; index < loop; index++) {
		const query = `
        INSERT INTO photo (URL, room_id)
        VALUES (?, ?);
        `
		const params = [
			faker.image.urlPicsumPhotos(),
			faker.helpers.rangeToNumber({ min: 1, max: loop }),
		]
		await modifyQuery(query, params)
	}

	await modifyQuery(`
    CREATE TABLE IF NOT EXISTS amenity (
        id INT NOT NULL AUTO_INCREMENT,
        amenities VARCHAR(255) NOT NULL,
        PRIMARY KEY (id));
    `)
	await modifyQuery(`
        INSERT INTO amenity (amenities) 
        VALUES ('Free Wifi'),
        ('Towels'),
        ('Mini Bar'),
        ('Coffee Set'),
        ('Nice Views'),
        ('1/3 Bed Space'),
        ('24-Hour Guard'),
        ('Air Conditioner'),
        ('Television'),
        ('Coffee Set');
    `)

	await modifyQuery(`
    CREATE TABLE IF NOT EXISTS amenities_has_room (
        room_id INT NOT NULL,
        amenity_id INT NOT NULL,
        FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (amenity_id) REFERENCES amenity (id), 
        PRIMARY KEY (room_id, amenity_id));
            `)
	for (let index = 1; index <= loop; index++) {
		for (
			let indexAmenity = 1;
			indexAmenity <= Math.floor(Math.random() * (10 - 1) + 1);
			indexAmenity++
		) {
			const query = faker.helpers.arrayElement([
				`INSERT INTO amenities_has_room (room_id, amenity_id) VALUES (?, ?);`,
			])
			const params = [index, indexAmenity]
			await modifyQuery(query, params)
		}
	}
	endConection()
})()
