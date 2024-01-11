import supertest from 'supertest'
import { app } from '../app'
import mongoose from 'mongoose'

describe('Login endpoints', () => {
	test('should login', async () => {
		const res = await supertest(app).post('/login').send({
			email: 'david.pr.developer@gmail.com',
			password: 'ilovebaguettes',
		})
		console.log('body: ', res.body)
		console.log('header: ', res.header)
		expect(res.statusCode).toBe(200)
		expect(res.body).toHaveProperty('token')
		expect(res.body).toHaveProperty('payload')
	}, 10000)
	test('should NOT login', async () => {
		const res = await supertest(app).post('/login').send({
			email: 'david',
			password: 'pallarés',
		})
		expect(res.statusCode).toBe(401)
		expect(res.body).toEqual('Error: Email or password incorrect')
	})
})

describe('Trying to access a route without login', () => {
	test('should not access to a unathorized route', async () => {
		const res = await supertest(app).get('/rooms').send()
		expect(res.statusCode).toEqual(401)
		expect(res.body).toEqual({
			error: true,
			message: 'You are not authorized',
		})
	})
})

describe('Testing /bookings after login', () => {
	let bookingId: string = ''
	let guestName: string = ''
	let token: string = ''
	beforeAll(async () => {
		const res = await supertest(app).post('/login').send({
			email: 'david.pr.developer@gmail.com',
			password: 'ilovebaguettes',
		})
		token = res.body.token
	})
	test('Should return an array with all bookings', async () => {
		const res = await supertest(app).get('/bookings').set('token', token)
		bookingId = res.body[0]._id
		guestName = res.body[0].guest
		expect(Array.isArray(res.body)).toBeTruthy()
		expect(res.statusCode).toEqual(200)
	})
	test('Should return one booking', async () => {
		const res = await supertest(app)
			.get(`/bookings/${bookingId}`)
			.set('token', token)
		expect(res.statusCode).toEqual(200)
		expect(res.body).toHaveProperty('guest', guestName)
	})
	test('Should create one booking', async () => {
		const booking = {
			guest: 'Blacky TheBlack Cat',
			phone_number: '+34 638-55-33-13',
			order_date: '2023-11-09',
			check_in: '2023-11-18',
			check_out: '2023-11-23',
			special_request:
				'I wouled like bunch of food as soon as I arrive the hotel.',
			room_type: 'Double Bed',
			room_number: '905',
			status: 'In Progress',
		}
		const res = await supertest(app)
			.post('/bookings')
			.set('token', token)
			.send(booking)
		// expect(res.body).toEqual({ message: 'Booking successfully created' })
		expect(res.statusCode).toEqual(200)
	})
	test('Should modify one booking', async () => {
		const booking = {
			guest: 'Luna TheWhite Doggy',
			phone_number: '+34 638-55-33-13',
			order_date: '2023-11-09',
			check_in: '2023-11-18',
			check_out: '2023-11-23',
			special_request:
				'I wouled like bunch of food as soon as I arrive the hotel.',
			room_type: 'Double Bed',
			room_number: '905',
			status: 'In Progress',
		}
		const res = await supertest(app)
			.put(`/bookings/${bookingId}`)
			.set('token', token)
			.send(booking)
		// expect(res.body).toEqual({ message: 'Booking successfully updated' })
		expect(res.statusCode).toEqual(200)
	})
	test('Should delete one booking', async () => {
		const res = await supertest(app)
			.delete(`/bookings/${bookingId}`)
			.set('token', token)
		// expect(res.body).toEqual({ message: 'Booking successfully deleted' })
		expect(res.statusCode).toEqual(200)
	})
})

describe('Testing /rooms after login', () => {
	let token = ''
	beforeAll(async () => {
		const res = await supertest(app).post('/login').send({
			email: 'david.pr.developer@gmail.com',
			password: 'ilovebaguettes',
		})
		token = res.body.token
	})
	test('Should return all the rooms', async () => {
		const res = await supertest(app).get('/rooms').set('token', token)
		expect(res.statusCode).toEqual(200)
	})
})
describe('Testing /contacts after login', () => {
	let token = ''
	beforeAll(async () => {
		const res = await supertest(app).post('/login').send({
			email: 'david.pr.developer@gmail.com',
			password: 'ilovebaguettes',
		})
		token = res.body.token
	})
	test('Should return all the contacts', async () => {
		const res = await supertest(app).get('/contacts').set('token', token)
		expect(res.statusCode).toEqual(200)
	})
})
describe('Testing /users after login', () => {
	let token = ''
	beforeAll(async () => {
		const res = await supertest(app).post('/login').send({
			email: 'david.pr.developer@gmail.com',
			password: 'ilovebaguettes',
		})
		token = res.body.token
	})
	test('Should return all the users', async () => {
		const res = await supertest(app).get('/users').set('token', token)
		expect(res.statusCode).toEqual(200)
	})
})

afterAll(async () => {
	try {
		await mongoose.disconnect()
	} catch (error) {
		console.log(`
        Error disconecting from mongo:
        ${error}
      `)
		throw error
	}
})
