import {Router} from "express";
import {userController} from "../controllers/UserController";

const userRouter = Router();

/* 회원 등록 */
userRouter.post('/users', userController.createUser);

/* 회원 조회 (id) */
userRouter.get('/users/:id', userController.findUserById);

/* 회원 조회 (email) */
userRouter.get('/users', userController.findUserByEmail);

/* 회원 정보 수정 */
userRouter.put('/users/:id', userController.updateUser);

/* 회원 정보 삭제 */
userRouter.delete('/users/:id', userController.deleteUser);

export default userRouter;