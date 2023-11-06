import mysql from 'mysql2/promise'
import 'dotenv/config'

const host = process.env.SQL_HOST as string
const user = process.env.SQL_USER as string
const database = process.env.SQL_DATABASE as string
const pass = process.env.SQL_PASSWORD as string

const pool = mysql.createPool({
	host: host,
	user: user,
	database: database,
	password: pass,
})

export const SelectQuery = async (queryString: string) => {
	const [results] = await pool.execute(queryString)
	return results
}
