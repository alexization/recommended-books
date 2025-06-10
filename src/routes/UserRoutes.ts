import {Router} from '../utils/Routes';
import {userController} from "../controllers/UserController";
import {UserRequest} from "../requests/UserRequest";
import {ServerResponse} from "http";

const userRouter = new Router();

/* 회원 등록 */
userRouter.post('/users', async (req: UserRequest, res: ServerResponse): Promise<void> => {
    await userController.createUser(req, res);
});

/* 회원 조회 (id) */
userRouter.get('/users/:id', async (req: UserRequest, res: ServerResponse): Promise<void> => {
    await userController.findUserById(req, res);
});

/* 회원 조회 (email) */
userRouter.get('/users', async (req: UserRequest, res: ServerResponse): Promise<void> => {
    await userController.findUserByEmail(req, res);
});

/* 회원 정보 수정 */
userRouter.put('/users/:id', async (req: UserRequest, res: ServerResponse): Promise<void> => {
    await userController.updateUser(req, res);
});

/* 회원 정보 삭제 */
userRouter.delete('/users/:id', async (req: UserRequest, res: ServerResponse): Promise<void> => {
    await userController.deleteUser(req, res);
});

export default userRouter;