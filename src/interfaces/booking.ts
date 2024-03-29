import { IRoom } from './room'

export interface IBooking {
	_id?: number | string
	guest: string
	phone_number: string
	order_date: string
	check_in: string
	check_out: string
	special_request: string
	room_type: string
	room_number: string
	status: string
	reference_number: string
	roomId: IRoom
}
