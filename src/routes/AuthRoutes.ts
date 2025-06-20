import Router from "@koa/router";
import {authController} from "../controllers/AuthController.js";

const authRouter = new Router({
    prefix: '/auth'
});

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: 사용자 로그인
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginUserData'
 *      responses:
 *          200:
 *              description: 성공
 * */
authRouter.post('/login', authController.login);

export default authRouter;