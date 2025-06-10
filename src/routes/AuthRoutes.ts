import Router from "@koa/router";
import {authController} from "../controllers/AuthController";

const authRouter = new Router({
    prefix: '/auth'
});

/* 로그인 */
authRouter.post('/login', authController.login);

export default authRouter;