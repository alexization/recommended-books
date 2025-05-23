import {config as dotenvConfig} from 'dotenv';

dotenvConfig();

export const config = {
    server: {
        port: process.env.PORT,
        host: process.env.HOST,
    },

    storage: {
        dataDir: process.env.DATA_DIR,
        usersFile: process.env.USERS_FILE,
    },

    api: {
        baseUrl: process.env.API_BASE_URL,
    }
}