import http from 'http';
import {Router} from './utils/Routes.js';
import {ResponseHandler} from "./utils/ResponseHandler.ts";
import {userService} from "./services/UserService.js";
import userRouter from "./routes/UserRoutes.js";
import bookRouter from "./routes/BookRoutes.js";
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware.ts";

export function createServer() {
    const router = new Router();

    router.useMiddleware(errorHandlerMiddleware);

    router.use(userRouter);
    router.use(bookRouter);

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

export async function startServer(port = 3000) {
    return new Promise(async (resolve, reject) => {
        try {
            await userService.initialize();
            const server = createServer();

            server.listen(port, () => {
                resolve(server);
            });
            server.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
}