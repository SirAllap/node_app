"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.stdout.write('\x1B[2J\x1B[0f');
const app_1 = require("./app");
require("dotenv/config");
const PORT = process.env.PORT;
app_1.app.listen(PORT, () => {
    console.info('>'.repeat(40));
    console.info(`📡  PORT: http://localhost:${PORT}`);
    console.info('>'.repeat(40) + '\n');
}).on('error', (err) => {
    console.error('Error starting the server:', err);
    throw new Error('Error starting the server');
});
