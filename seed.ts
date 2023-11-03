import { connect } from 'mongoose'
import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { BookingModel } from './src/models/booking.model'
import { RoomModel } from './src/models/room.model'
import { ContactModel } from './src/models/contact.model'
import { UserModel } from './src/models/user.model'
import { IRoom } from './src/interfaces/room'
;(async () => {
	// const URI: string = process.env.MONGO_URI || ''
	const URI_ATLAS: string = process.env.MONGO_ATLAS_URI || ''
	try {
		await connect(URI_ATLAS, {
			dbName: process.env.MONGO_DB || 'Dashboard-api',
		})
		console.log('Connected to MongoDB')

		BookingModel.collection.drop()
		RoomModel.collection.drop()
		ContactModel.collection.drop()
		UserModel.collection.drop()

		const numOfData: number = 10
		const createdRooms: IRoom[] = []

		for (let index = 0; index < numOfData; index++) {
			const roomInput = {
				room_number: faker.helpers.rangeToNumber({
					min: 100,
					max: 900,
				}),
				room_photo: faker.image.urlPicsumPhotos(),
				room_type: faker.helpers.arrayElement([
					'Single Bed',
					'Double Bed',
					'Double Superior',
					'Suite',
				]),
				description: faker.lorem.sentence(),
				amenities_type: faker.helpers.arrayElement([
					'full',
					'midrange',
					'basic',
					'premium',
				]),
				amenities: faker.helpers.arrayElements([
					{ name: '1/3 Bed Space', description: 'Spacious bed area' },
					{
						name: '24-Hour Guard',
						description: 'Security available around the clock',
					},
					{
						name: 'Free Wifi',
						description: 'High-speed internet access',
					},
					{ name: 'Air Conditioner', description: 'Climate control' },
					{ name: 'Television', description: 'Flat-screen TV' },
					{ name: 'Towels', description: 'Fresh towels provided' },
					{
						name: 'Mini Bar',
						description: 'Mini bar with refreshments',
					},
					{
						name: 'Coffee Set',
						description: 'Coffee and tea making facilities',
					},
					{ name: 'Bathtub', description: 'Luxurious bathtub' },
					{ name: 'Jacuzzi', description: 'Private Jacuzzi' },
					{
						name: 'Nice Views',
						description: 'Scenic views from the room',
					},
				]),
				price: faker.helpers.rangeToNumber({ min: 100, max: 1000 }),
				offer_price: faker.helpers.arrayElement(['true', 'false']),
				discount: faker.helpers.arrayElement([0, 5, 10, 20]),
				status: faker.helpers.arrayElement(['Available', 'Booked']),
			}
			const room = await RoomModel.create(roomInput)
			createdRooms.push(room)
		}

		for (let index = 0; index < numOfData + 20; index++) {
			const bookingInput = {
				guest: faker.person.fullName(),
				phone_number: faker.phone.number(),
				order_date: faker.date.recent(),
				check_in: faker.date.recent(),
				check_out: faker.date.recent(),
				special_request: faker.lorem.sentence(),
				room_type: createdRooms[index].room_type,
				room_number: createdRooms[index].room_number,
				status: faker.helpers.arrayElement([
					'CheckIn',
					'CheckOut',
					'In Progress',
				]),
				photos: [faker.image.urlPicsumPhotos()],
				roomId: createdRooms[index]._id,
			}
			await BookingModel.create(bookingInput)
		}

		for (let index = 0; index < numOfData; index++) {
			const contactInput = {
				full_name: faker.person.fullName(),
				email: faker.internet.email(),
				phone_number: faker.phone.number(),
				subject_of_review: faker.lorem.sentence(),
				review_body: faker.lorem.sentence(),
				date: faker.date.recent(),
				dateTime: faker.date.recent(),
				isArchived: faker.helpers.arrayElement(['true', 'false']),
			}
			await ContactModel.create(contactInput)
		}

		await UserModel.create({
			full_name: 'David Pallarés Robaina',
			password:
				'$2a$10$vBaQo2hqdDGMwimjbE7YaeyD1ABwFy8sPbogp.uSxUZjhF7JD1IFy',
			email: 'dpr@gmail.com',
			photo: 'https://robohash.org/DavidPR.png?set=any',
			start_date: '2020-05-15',
			description: 'Front Desk',
			phone_number: '+1 (123) 456-7890',
			status: 'active',
		})
		for (let index = 0; index < numOfData; index++) {
			const userInput = {
				full_name: faker.person.fullName(),
				password: faker.internet.password(),
				email: faker.internet.email(),
				photo: faker.image.avatar(),
				start_date: faker.date.recent(),
				description: faker.lorem.sentence(),
				phone_number: faker.phone.number(),
				status: faker.helpers.arrayElement(['active', 'inactive']),
			}
			await UserModel.create(userInput)
		}
		process.exit()
	} catch (err) {
		throw new Error(`Error: ${err}`)
	}
})()
