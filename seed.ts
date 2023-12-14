import { faker } from '@faker-js/faker'
import { modifyQuery, endConection } from './src/util/util'

const loop: number = 200
const loopPlus: number = 2000

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
	    quick_description LONGTEXT NOT NULL,
	    description LONGTEXT NOT NULL,
	    price INT NOT NULL,
	    discount INT NOT NULL,
	    status BOOLEAN NOT NULL,
	    PRIMARY KEY(id));
	`)
	for (let index = 1; index <= loop; index++) {
		const query = `
            INSERT INTO room (room_number, room_type, quick_description, description, price, discount, status)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `
		const params = [
			index,
			faker.helpers.arrayElement([
				'Single Bed',
				'Double Bed',
				'Double Superior',
				'Suite',
			]),
			faker.helpers.arrayElement([
				'Experience opulence in our spacious suite, combining chic living with sumptuous comfort.',
				'Indulge in refined luxury, featuring extra space and enhanced amenities.',
				'Unwind in style with a spacious double bed and modern conveniences.',
				'Embrace solo comfort in our cozy room, designed for a peaceful retreat.',
			]),
			faker.helpers.arrayElement([
				"Embrace comfort and simplicity in our Single Bed Room, designed for solo travelers seeking a cozy retreat. This thoughtfully appointed space features a comfortable single bed, modern amenities, and a private bathroom. Whether you're here for business or leisure, enjoy a restful night's sleep in a space tailored to meet your individual needs.",
				'Unwind in style in our Double Bed Room, perfect for couples or those who prefer a bit more space. Revel in the inviting atmosphere, furnished with a spacious double bed, contemporary decor, and all the conveniences you desire. This room offers a harmonious blend of comfort and functionality, ensuring a pleasant stay for you and your companion.',
				'Elevate your stay in our Double Superior Room, where luxury meets convenience. This refined accommodation boasts a generous double bed, enhanced amenities, and additional space for your comfort. Immerse yourself in an ambiance of sophistication, and indulge in the heightened level of service and attention to detail that sets our Superior rooms apart.',
				'Experience the epitome of luxury in our exquisite Suite, designed for those who seek an indulgent escape. This spacious haven combines a chic living area with a sumptuous bedroom, offering a heightened level of privacy and opulence. Enjoy panoramic views, premium amenities, and personalized service, creating an unforgettable retreat for those who appreciate the finer things in life. Unwind in style and make your stay truly exceptional in our distinguished Suite.',
			]),
			faker.helpers.rangeToNumber({ min: 140, max: 1400 }),
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
		email VARCHAR(255) NOT NULL,
        order_date DATE NOT NULL DEFAULT (CURRENT_DATE),
        check_in DATE NOT NULL,
        check_out DATE NOT NULL,
        special_request VARCHAR(255) NOT NULL,
        status VARCHAR(45) NOT NULL DEFAULT 'Check In',
        room_id INT NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY (room_id) REFERENCES room (id) ON DELETE CASCADE ON UPDATE CASCADE);
	`)
	for (let index = 0; index < loopPlus; index++) {
		const query = `
        INSERT INTO booking (guest, phone_number, email, order_date, check_in, check_out, special_request, status, room_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `
		const orderDate = faker.date.between({
			from: '2023-11-22T00:00:00.000Z',
			to: '2023-12-01T00:00:00.000Z',
		})
		const checkIn = faker.date.between({
			from: orderDate,
			to: '2024-12-31T00:00:00.000Z',
		})
		const checkOut = faker.date.between({
			from: checkIn,
			to: '2025-06-01T00:00:00.000Z',
		})
		const params = [
			faker.person.fullName(),
			faker.phone.number(),
			faker.internet.email(),
			orderDate.toISOString().slice(0, 10),
			checkIn.toISOString().slice(0, 10),
			checkOut.toISOString().slice(0, 10),
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
        date DATE NOT NULL DEFAULT (CURRENT_DATE),
        status BOOLEAN NOT NULL DEFAULT true,
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
	for (let index = 1; index <= loop; index++) {
		const query = `
        INSERT INTO photo (URL, room_id)
        VALUES (?, ?);
        `
		const url = faker.helpers.arrayElement([
			'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
			'https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/1103808/pexels-photo-1103808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		])
		const room_id = index
		const params = [url, room_id]
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
        ('Expert Team'),
        ('Single Bed'),
        ('Kitchen'),
        ('Air Conditioner'),
        ('Strong Locker'),
        ('Breakfast'),
        ('Cleaning'),
        ('Grocery'),
        ('Shop Near'),
        ('24/7 Online Support'),
        ('Smart Security');
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
			indexAmenity <= Math.floor(Math.random() * (12 - 5) + 5);
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
