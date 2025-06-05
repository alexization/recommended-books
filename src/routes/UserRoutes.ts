import Router from '@koa/router';
import {userController} from "../controllers/UserController";

const userRouter = new Router({
    prefix: '/users'
});

/* 회원 등록 */
userRouter.post('/', async (ctx): Promise<void> => {
    await userController.createUser(ctx);
});

/* 회원 조회 (id) */
userRouter.get('/:id', async (ctx): Promise<void> => {
    await userController.findUserById(ctx);
});

/* 회원 조회 (email) */
userRouter.get('/', async (ctx): Promise<void> => {
    await userController.findUserByEmail(ctx);
});

/* 회원 정보 수정 */
userRouter.put('/:id', async (ctx): Promise<void> => {
    await userController.updateUser(ctx);
});

/* 회원 정보 삭제 */
userRouter.delete('/:id', async (ctx): Promise<void> => {
    await userController.deleteUser(ctx);
});

export default userRouter;