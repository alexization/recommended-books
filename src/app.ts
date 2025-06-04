import express, {Application} from 'express';
import {Server} from 'http';
import {userService} from "./services/UserService";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware";

export async function startServer(port: number = 3000): Promise<Server> {
    return new Promise(async (resolve, reject): Promise<void> => {
        try {
            await userService.initialize();

            const app: Application = createServer();

            const server = app.listen(port, () => {
                console.log(`Server started at ${port}`);
                resolve(server);
            });

            server.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
}

export function createServer(): Application {
    const app: Application = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(userRouter);
    app.use(bookRouter);

    app.use(errorHandlerMiddleware);

    return app;
}
