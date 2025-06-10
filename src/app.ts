import http, {IncomingMessage, Server, ServerResponse} from 'http';
import {Router} from './utils/Routes';
import {ResponseHandler} from "./utils/ResponseHandler";
import {userService} from "./services/UserService";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware";

export function createServer(): Server {
    const router = new Router();

    router.useMiddleware(errorHandlerMiddleware);

    router.use(userRouter);
    router.use(bookRouter);

    const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
        try {
            await router.handleRequest(req, res);
        } catch (error: unknown) {
            ResponseHandler.error(res, '서버 오류가 발생했습니다.', 500);
        }
    });

    server.on('error', (error: Error): void => {
        console.error(error);
        process.exit(1);
    });

    return server;
}

export async function startServer(port: number = 3000): Promise<Server> {
    return new Promise(async (resolve, reject) => {
        try {
            await userService.initialize();
            const server: Server = createServer();

            server.listen(port, () => {
                resolve(server);
            });
            server.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
}