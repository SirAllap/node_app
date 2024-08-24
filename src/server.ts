process.stdout.write('\x1B[2J\x1B[0f')

import { app } from './app'
import 'dotenv/config'

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.info('>'.repeat(40))
	if (process.env.NODE_ENV === 'development')
		console.info(`📡  PORT: http://localhost:${PORT}`)
	else console.info(`📡  PORT: ${PORT}`)
	console.info('>'.repeat(40) + '\n')
}).on('error', (err) => {
	console.error('Error starting the server:', err)
	throw new Error('Error starting the server')
})
