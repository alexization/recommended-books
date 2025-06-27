import Router from '@koa/router';
import {userController} from "../controllers/UserController.js";

const userRouter = new Router({
    prefix: '/users'
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: 신규 회원 등록
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateUserData'
 *      responses:
 *          200:
 *              description: 성공
 * */
userRouter.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: 회원 조회 (ID)
 *      tags: [Users]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: 성공
 * */
userRouter.get('/:id', userController.findUserById);

/**
 * @swagger
 * /users:
 *  get:
 *      summary: 회원 조회 (email)
 *      tags: [Users]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: email
 *            required: true
 *            schema:
 *              type: string
 *              format: email
 *      responses:
 *          200:
 *              description: 성공
 * */
userRouter.get('/', userController.findUserByEmail);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      summary: 회원 정보 수정
 *      tags: [Users]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserData'
 *      responses:
 *          200:
 *              description: 성공
 * */
userRouter.put('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: 회원 정보 삭제
 *      tags: [Users]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *      responses:
 *          200:
 *              description: 성공
 * */
userRouter.delete('/:id', userController.deleteUser);

userRouter.put('/change/password', userController.changePassword);

export default userRouter;