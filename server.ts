import dotenv from 'dotenv';
import {startServer} from "./src/app";

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function main(): Promise<void> {
    try {
        await startServer(PORT);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

process.on('uncaughtException', (error: Error) => {
    console.error(error);
    process.exit(1);
})

process.on('unhandledRejection', (reason, promise: Promise<any>) => {
    console.error(reason);
    process.exit(1);
})

main();