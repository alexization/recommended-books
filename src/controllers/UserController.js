import {userService} from "../services/UserService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";

export class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    async createUser(req, res) {
        try {
            const {email, name, birth} = req.body;

            const newUser = await this.userService.createUser({
                email, name, birth,
            });

            ResponseHandler.success(res, newUser, '사용자가 정상적으로 등록되었습니다.');
        } catch (error) {
            ResponseHandler.error(res, error);
        }
    }

}

export const userController =  new UserController(userService);