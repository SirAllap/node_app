import { connect } from 'mongoose'
import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { BookingModel } from './src/models/booking.model'
import { RoomModel } from './src/models/room.model'
import { ContactModel } from './src/models/contact.model'
import { UserModel } from './src/models/user.model'
import { IRoom } from './src/interfaces/room'
;(async () => {
	const URI: string = process.env.MONGO_URI || ''
	const DBNAME: string = process.env.MONGO_DB || ''
	try {
		await connect(URI, {
			dbName: DBNAME || 'Dashboard-api',
		})
		console.log('Connected to MongoDB')

		BookingModel.collection.drop()
		RoomModel.collection.drop()
		ContactModel.collection.drop()
		UserModel.collection.drop()

		const numOfData: number = 200
		const numOfDataPlus: number = 2000
		const createdRooms: IRoom[] = []
		const roomNumberGenerator = (roomNumber: number) => {
			const num = roomNumber.toString().padStart(3, '0')
			return parseInt(num)
		}

		for (let index = 1; index <= numOfData; index++) {
			const roomInput = {
				room_number: roomNumberGenerator(index),
				room_photo: faker.helpers.arrayElement([
					[
						'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
						'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
					],
					[
						'https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/1103808/pexels-photo-1103808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					],
					[
						'https://images.pexels.com/photos/3634741/pexels-photo-3634741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					],
					[
						'https://images.pexels.com/photos/3144580/pexels-photo-3144580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
						'https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					],
				]),
				room_type: faker.helpers.arrayElement([
					'Single Bed',
					'Double Bed',
					'Double Superior',
					'Suite',
				]),
				description: faker.helpers.arrayElement([
					"Embrace comfort and simplicity in our Single Bed Room, designed for solo travelers seeking a cozy retreat. This thoughtfully appointed space features a comfortable single bed, modern amenities, and a private bathroom. Whether you're here for business or leisure, enjoy a restful night's sleep in a space tailored to meet your individual needs.",
					'Unwind in style in our Double Bed Room, perfect for couples or those who prefer a bit more space. Revel in the inviting atmosphere, furnished with a spacious double bed, contemporary decor, and all the conveniences you desire. This room offers a harmonious blend of comfort and functionality, ensuring a pleasant stay for you and your companion.',
					'Elevate your stay in our Double Superior Room, where luxury meets convenience. This refined accommodation boasts a generous double bed, enhanced amenities, and additional space for your comfort. Immerse yourself in an ambiance of sophistication, and indulge in the heightened level of service and attention to detail that sets our Superior rooms apart.',
					'Experience the epitome of luxury in our exquisite Suite, designed for those who seek an indulgent escape. This spacious haven combines a chic living area with a sumptuous bedroom, offering a heightened level of privacy and opulence. Enjoy panoramic views, premium amenities, and personalized service, creating an unforgettable retreat for those who appreciate the finer things in life. Unwind in style and make your stay truly exceptional in our distinguished Suite.',
				]),
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
				price: faker.helpers.rangeToNumber({ min: 110, max: 700 }),
				offer_price: faker.helpers.arrayElement(['true', 'false']),
				discount: faker.helpers.arrayElement([0, 5, 10, 20]),
				status: faker.helpers.arrayElement(['Available', 'Booked']),
			}
			const room = await RoomModel.create(roomInput)
			createdRooms.push(room)
		}

		for (let index = 0; index < numOfDataPlus; index++) {
			let randomRoom = Math.floor(Math.random() * numOfData)
			const randomId = createdRooms[randomRoom]._id
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
			const bookingInput = {
				guest: faker.person.fullName(),
				phone_number: faker.phone.number(),
				order_date: orderDate.toISOString().slice(0, 10),
				check_in: checkIn.toISOString().slice(0, 10),
				check_out: checkOut.toISOString().slice(0, 10),
				special_request: faker.lorem.sentence(),
				room_type: createdRooms[randomRoom].room_type,
				room_number: createdRooms[randomRoom].room_number,
				status: faker.helpers.arrayElement([
					'CheckIn',
					'CheckOut',
					'In Progress',
				]),
				reference_number: faker.string.alphanumeric({
					length: 5,
					casing: 'upper',
				}),
				roomId: randomId,
			}
			await BookingModel.create(bookingInput)
		}

		for (let index = 0; index < numOfData; index++) {
			const contactInput = {
				full_name: faker.person.fullName(),
				email: faker.internet.email(),
				phone_number: faker.phone.number(),
				subject_of_review: faker.lorem.sentence({ min: 2, max: 4 }),
				review_body: faker.lorem.sentence({ min: 5, max: 15 }),
				date: faker.date.recent(),
				dateTime: faker.date.recent(),
				isArchived: 'false',
			}
			await ContactModel.create(contactInput)
		}

		await UserModel.create({
			full_name: 'David Pallarés Robaina',
			password:
				'$2a$10$vBaQo2hqdDGMwimjbE7YaeyD1ABwFy8sPbogp.uSxUZjhF7JD1IFy',
			email: 'david.pr.developer@gmail.com',
			photo: 'https://avatars.githubusercontent.com/u/53468881',
			start_date: faker.date.recent(),
			description: 'FullStack Developer',
			phone_number: '+34 638-492-817',
			status: 'active',
		})
		for (let index = 0; index < numOfData; index++) {
			const userInput = {
				full_name: faker.person.fullName(),
				password: faker.internet.password(),
				email: faker.internet.email(),
				photo: faker.image.avatar(),
				start_date: faker.date.recent(),
				description: faker.helpers.arrayElement([
					'Hotel Director',
					'Cleaner',
					'Recepcionist',
					'Chef',
					'Kitchen Porter',
				]),
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
