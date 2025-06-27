import Koa from 'koa';
import cors from '@koa/cors';
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import helmet from 'koa-helmet';
import {errorHandlerMiddleware} from "./middlewares/ErrorHandlerMiddleware.js";
import userRouter from "./routes/UserRoutes.js";
import bookRouter from "./routes/BookRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import {jwtAuthMiddleware} from "./middlewares/JwtAuthMiddleware.js";
import {DatabaseConnection} from "./config/DatabaseConfig.js";
import {swaggerUI} from "./config/Swagger";
import {cronService} from "./services/CronService";
import postRouter from "./routes/PostRoutes";
import followRouter from "./routes/FollowRoutes";
import commentRoutes from "./routes/CommentRoutes";
import postLikeRoutes from "./routes/PostLikeRoutes";

dotenv.config();

export function createApp(): Koa {
    const app = new Koa();

    /* 에러 처리 미들웨어 */
    app.use(errorHandlerMiddleware);

    /* 보안 헤더 설정 */
    app.use(helmet({
        contentSecurityPolicy: false
    }));

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

    app.use(swaggerUI);

    /* 라우터 등록 */
    app.use(userRouter.routes());
    app.use(userRouter.allowedMethods());
    app.use(bookRouter.routes());
    app.use(bookRouter.allowedMethods());
    app.use(authRouter.routes());
    app.use(authRouter.allowedMethods());
    app.use(postRouter.routes());
    app.use(postRouter.allowedMethods);
    app.use(followRouter.routes());
    app.use(userRouter.allowedMethods);
    app.use(commentRoutes.routes());
    app.use(commentRoutes.allowedMethods);
    app.use(postLikeRoutes.routes());
    app.use(postLikeRoutes.allowedMethods);

    return app;
}

export async function startServer(port: number = 3000): Promise<Koa> {
    try {
        DatabaseConnection.getInstance();

        const app = createApp();

        cronService.start();
        console.log('Schedule Start');

        app.listen(port, () => {
            console.log((`Server started at ${port}`));
        });

        return app;
    } catch (error) {
        console.error('Server start failed: ', error);
        throw error;
    }
}