import http from 'http';
import {Router} from './utils/Routes.js';
import {ResponseHandler} from "./utils/ResponseHandler.js";

export function createServer() {
    const router = new Router();

    const server = http.createServer(async (req, res) => {
        try {
            await router.handleRequest(req, res);
        } catch (error) {
            ResponseHandler.error(res, '서버 오류가 발생했습니다.');
        }
    });

    server.on('error', (error) => {
        process.exit(1);
    });

    return server;
}

export function startServer(port = 3000) {
    return new Promise((resolve, reject) => {
        const server = createServer();

        server.listen(port, () => {
            resolve(server);
        });

        server.on('error', reject);
    });
}