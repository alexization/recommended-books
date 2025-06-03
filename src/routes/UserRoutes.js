import {Router} from '../utils/Routes.ts';
import {userController} from "../controllers/UserController.js";

const userRouter = new Router();

/* 회원 등록 */
userRouter.post('/users', async (req, res) => {
    await userController.createUser(req, res);
})

/* 회원 조회 (id) */
userRouter.get('/users/:id', async (req, res) => {
    await userController.findUserById(req, res);
})

/* 회원 조회 (email) */
userRouter.get('/users', async (req, res) => {
    await userController.findUserByEmail(req, res);
})

/* 회원 정보 수정 */
userRouter.put('/users', async (req, res) => {
    await userController.updateUser(req, res);
})

/* 회원 정보 삭제 */
userRouter.delete('/users/:id', async (req, res) => {
    await userController.deleteUser(req, res);
})

export default userRouter;