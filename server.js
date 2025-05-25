import dotenv from 'dotenv';
import {startServer} from "./src/app.js";

dotenv.config();

const PORT = process.env.PORT;

async function main() {
    try {
        await startServer(PORT);
        console.log(`Server started at ${PORT}`);
    } catch (error) {
        process.exit(1);
    }
}

process.on('uncaughtException', error => {
    console.error(error);
    process.exit(1);
})

process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    process.exit(1);
})

main();