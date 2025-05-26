import {Router} from '../utils/Routes.js';
import {userController} from "../controllers/UserController.js";

const userRouter = new Router();

/* 회원 등록 */
userRouter.post('/user', async (req, res) => {
    await userController.createUser(req, res);
})

/* 회원 조회 (id) */
userRouter.get('/user/:id', async (req, res) => {
    await userController.findUserById(req, res);
})

/* 회원 조회 (email) */
userRouter.get('/user', async (req, res) => {
    await userController.findUserByEmail(req, res);
})

export default userRouter;