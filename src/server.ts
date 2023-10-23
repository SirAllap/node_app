import { Request, Response } from 'express'
import { app } from './app'
import 'dotenv/config'

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
	res.send("I'm alive MAAAATE 😎")
})

app.listen(port, () => {
	console.log(`Server running ⚡️ on port: http://localhost:${port}`)
})
