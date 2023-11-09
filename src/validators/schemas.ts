import Joi from 'joi'

export const authSchema = Joi.object({
	user: Joi.string().alphanum().min(3).max(10).required(),
	pass: Joi.string()
		.min(3)
		.max(10)
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

export const bookingSchema = Joi.object({
	guest: Joi.string().alphanum().required(),
	phone_number: Joi.string().required(),
	order_date: Joi.date()
		.required()
		.min(new Date().toISOString().split('T')[0]),
	check_in: Joi.date()
		.required()
		.greater(Joi.ref('order_date'))
		.message('The check in date must be greater than the order date'),
	check_out: Joi.date()
		.required()
		.greater(Joi.ref('check_in'))
		.message('The check in date must be greater than the order date'),
	special_request: Joi.string().required().min(1).max(150),
	status: Joi.string()
		.required()
		.valid('Check In', 'Check Out', 'In Progress'),
	room_id: Joi.number().required(),
})

export const roomSchema = Joi.object({
	room_number: Joi.string().required(),
	room_type: Joi.string()
		.required()
		.valid('Single Bed', 'Double Bed', 'Double Superior', 'Suite'),
	description: Joi.string().required().min(1).max(1650),
	price: Joi.number().required(),
	offer_price: Joi.boolean().required().valid(true, false),
	discount: Joi.number().required().valid(0, 5, 10, 15, 20),
	status: Joi.string().required().valid('Available', 'Booked'),
})

export const userSchema = Joi.object({
	full_name: Joi.string().required(),
	email: Joi.string().required().email(),
	photo: Joi.string().required(),
	start_date: Joi.date()
		.required()
		.min(new Date().toISOString().split('T')[0]),
	description: Joi.string().required().min(1).max(150),
	phone_number: Joi.string().required(),
	status: Joi.string().required().valid('Active', 'Inactive'),
})

export const contactSchema = Joi.object({
	full_name: Joi.string().required(),
	email: Joi.string().required().email(),
	phone_number: Joi.string().required(),
	subject_of_review: Joi.string().required().min(1).max(50),
	review_body: Joi.string().required().min(1).max(450),
	date: Joi.date().required().min(new Date().toISOString().split('T')[0]),
	status: Joi.string().required().valid('Not Archived', 'Archived'),
})
