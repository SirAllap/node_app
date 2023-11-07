import mysql, { PoolOptions } from 'mysql2/promise'
import 'dotenv/config'

const host = process.env.SQL_HOST as string
const user = process.env.SQL_USER as string
const database = process.env.SQL_DATABASE as string
const pass = process.env.SQL_PASSWORD as string

const access: PoolOptions = {
	host: host,
	user: user,
	database: database,
	password: pass,
	idleTimeout: 60000,
}

const pool = mysql.createPool(access)

export const SelectQuery = async (query: string) => {
	const [results] = await pool.execute(query)
	return results
}
// export const SelectQuery = async (query: string, params: any[] = []) => {
// 	const [results] = await pool.execute(query, params)
// 	return results
// }
