import supertest from 'supertest'
import { app } from '../app'

// const URL = 'https://qh9d0mep6j.execute-api.eu-west-1.amazonaws.com'

describe('Login endpoints', () => {
	test('should login', async () => {
		const res = await supertest(app).post('/login').send({
			user: 'admin',
			pass: 'admin',
		})
		expect(res.statusCode).toEqual(200)
		expect(res.body).toHaveProperty('token' && 'payload')
	})
	test('should NOT login', async () => {
		const res = await supertest(app).post('/login').send({
			user: 'david',
			pass: 'pallarés',
		})
		expect(res.statusCode).toEqual(400)
		expect(res.body).toEqual('Error: Credentials are wrong')
	})
})
describe('Trying to access a route without login', () => {
	test('should access to a unathorized route', async () => {
		const res = await supertest(app).get('/rooms').send()
		expect(res.statusCode).toEqual(404)
		expect(res.body).toEqual('Error: You are not authorized')
	})
})

describe('Testing /bookings after login', () => {
	let bookingId = ''
	let guestName = ''
	let token = ''
	beforeAll(async () => {
		const res = await supertest(app).post('/login').send({
			user: 'admin',
			pass: 'admin',
		})
		token = res.body.token
	})
	test('Should return all the bookings', async () => {
		const res = await supertest(app).get('/bookings').set('token', token)
		bookingId = res.body[0].id
		guestName = res.body[0].guest
		expect(res.statusCode).toEqual(200)
	})
	test('Should return one booking', async () => {
		const res = await supertest(app)
			.get(`/bookings/${bookingId}`)
			.set('token', token)
		expect(res.statusCode).toEqual(200)
		expect(res.body[0]).toHaveProperty('guest', guestName)
	})
	test('Should create one booking', async () => {
		const booking = {
			id: '5EFGF232',
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
			photos: [
				'https://i.pinimg.com/originals/56/2c/97/562c97a653e162511371c8bb97286486.jpg',
			],
		}
		const res = await supertest(app)
			.post('/bookings')
			.set('token', token)
			.send(booking)
		expect(res.statusCode).toEqual(200)
		expect(res.body).toEqual('Booking successfully created')
	})
	test('Should modify one booking', async () => {
		const booking = {
			id: '2DPRGFH234',
			guest: 'Luna La Blanca',
			phone_number: '+34 638-55-33-13',
			order_date: '2023-11-09',
			check_in: '2023-11-18',
			check_out: '2023-11-23',
			special_request: 'Please provide extra doggy food 🐶.',
			room_type: 'Suite',
			room_number: '905',
			status: 'In Progress',
			photos: [
				'https://i.pinimg.com/originals/56/2c/97/562c97a653e162511371c8bb97286486.jpg',
			],
		}
		const res = await supertest(app)
			.put(`/bookings/${bookingId}`)
			.set('token', token)
			.send(booking)
		expect(res.statusCode).toEqual(200)
		expect(res.body).toEqual('Booking successfully updated')
	})
	test('Should delete one booking', async () => {
		const res = await supertest(app)
			.delete(`/bookings/${bookingId}`)
			.set('token', token)
		expect(res.statusCode).toEqual(200)
		expect(res.body).toEqual('Booking successfully deleted')
	})
})

describe('Testing /rooms after login', () => {
	let token = ''
	beforeAll(async () => {
		const res = await supertest(app).post('/login').send({
			user: 'admin',
			pass: 'admin',
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
			user: 'admin',
			pass: 'admin',
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
			user: 'admin',
			pass: 'admin',
		})
		token = res.body.token
	})
	test('Should return all the users', async () => {
		const res = await supertest(app).get('/users').set('token', token)
		expect(res.statusCode).toEqual(200)
	})
})
