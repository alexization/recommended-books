import express, {Application} from 'express';
import {userService} from "./services/UserService";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware";

export function createServer(): Application {
    const app: Application = express();

    /* 미들웨어 설정 */
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    /* 라우터 설정 */
    app.use(userRouter);
    app.use(bookRouter);

    app.use(errorHandlerMiddleware);

    return app;
}

export async function startServer(port: number = 3000): Promise<void> {
    try {
        await userService.initialize();

        const app: Application = createServer();

        app.listen(port, () => {
            console.log(`Server started at ${port}`);
        });

    } catch (error) {
        console.error('Server startup failed', error);
        throw error;
    }
}
