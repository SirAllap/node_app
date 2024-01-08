export interface IUserClient {
	_id?: number | string
	full_name: string
	password: string
	email: string
	phone_number: string
	photo?: string
}
