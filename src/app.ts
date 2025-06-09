import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from "koa-bodyparser";
import {userService} from "./services/UserService";
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";

export function createApp(): Koa {
    const app = new Koa();

    app.use(errorHandlerMiddleware);

    /* Body parser 미들웨어 (JSON 요청 자동 파싱) */
    app.use(bodyParser({
        enableTypes: ['json']
    }));

    app.use(helmet());

    app.use(cors());

    /* 라우터 등록 */
    app.use(userRouter.routes());
    app.use(userRouter.allowedMethods());
    app.use(bookRouter.routes());
    app.use(bookRouter.allowedMethods());

    return app;
}

export async function startServer(port: number = 3000): Promise<Koa> {
    try {
        await userService.initialize();

        const app = createApp();

        app.listen(port, () => {
            console.log((`Server started at ${port}`));
        });

        return app;
    } catch (error) {
        console.error('Server start failed: ', error);
        throw error;
    }
}