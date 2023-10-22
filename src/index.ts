import express, { Express, Request, Response } from 'express'
import fs from 'fs'
const app: Express = express()
const port = 3000

const data = fs.readFileSync('file/countries.txt', {
	encoding: 'utf8',
	flag: 'r',
})

app.get('/', (req: Request, res: Response) => {
	res.send('this is the txt file: ' + data)
})

app.listen(port, () => {
	console.log(`⚡️[server]: Example app listening on port ${port}`)
	console.log(data)
})
