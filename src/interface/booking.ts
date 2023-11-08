export interface IBooking {
	guest: string
	phone_number: string
	order_date: Date | string
	check_in: Date | string
	check_out: Date | string
	special_request: string
	status: string
	room_id: number
}
