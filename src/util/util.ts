import mysql, { PoolOptions, ResultSetHeader } from 'mysql2/promise'
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

export const SelectQuery = async (queryString: string, params?: any[]) => {
	const [results] = await pool.execute(queryString, params)
	return results
}

export const ModifyQuery = async (
	queryString: string,
	params?: any[]
): Promise<ResultSetHeader> => {
	const [results] = await pool.query(queryString, params)
	return results as ResultSetHeader
}
