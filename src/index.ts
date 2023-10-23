import express, { Express, Request, Response } from 'express'
import 'dotenv/config'

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
	res.send('I am alive!')
})

app.listen(port, () => {
	console.log(`⚡️[server]: Example app listening on port ${port}`)
})
