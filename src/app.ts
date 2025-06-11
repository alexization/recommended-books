import Koa from 'koa';
import cors from '@koa/cors';
import dotenv from "dotenv";
import helmet from 'koa-helmet';
import bodyParser from "koa-bodyparser";
import {userService} from "./services/UserService";
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";
import authRouter from "./routes/AuthRoutes";
import {jwtAuthMiddleware} from "./middlewares/JwtAuthMiddleware";

dotenv.config();

export function createApp(): Koa {
    const app = new Koa();

    /* 에러 처리 미들웨어 */
    app.use(errorHandlerMiddleware);

    /* 보안 헤더 설정 */
    app.use(helmet());

    /* CORS 설정 */
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['X-New-Access-Token', 'X-Token-Refreshed']
    }));

    /* Body parser 미들웨어 (JSON 요청 자동 파싱) */
    app.use(bodyParser({
        enableTypes: ['json']
    }));

    /* JWT 인증 미들웨어 */
    app.use(jwtAuthMiddleware);

    /* 라우터 등록 */
    app.use(userRouter.routes());
    app.use(userRouter.allowedMethods());
    app.use(bookRouter.routes());
    app.use(bookRouter.allowedMethods());
    app.use(authRouter.routes());
    app.use(authRouter.allowedMethods());

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