export interface IRoom {
	room_number: string
	id: string
	room_photo: string[]
	room_type: string
	description: string
	amenities_type: string
	amenities: [{ name: string; description: string }]
	price: number
	offer_price: boolean
	discount: number
	status: string
}
