import Router from '@koa/router';
import {userController} from "../controllers/UserController.js";

const userRouter = new Router({
    prefix: '/users'
});

/* 회원 등록 */
userRouter.post('/', userController.createUser);

/* 회원 조회 (id) */
userRouter.get('/:id', userController.findUserById);

/* 회원 조회 (email) */
userRouter.get('/', userController.findUserByEmail);

/* 회원 정보 수정 */
userRouter.put('/:id', userController.updateUser);

/* 회원 정보 삭제 */
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;