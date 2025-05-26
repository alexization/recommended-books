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

            ResponseHandler.success(res, '사용자가 정상적으로 등록되었습니다.', newUser);
        } catch (error) {
            ResponseHandler.error(res, error);
        }
    }

    async findUserById(req, res) {
        try {
            const id = req.params.id;

            const user = await this.userService.findUserById(id);
            ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
        } catch (error) {
            ResponseHandler.error(res, error);
        }
    }

    async findUserByEmail(req, res) {
        try {
            const {email} = req.body;

            const user = await this.userService.findUserByEmail(email);
            ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
        } catch (error) {
            ResponseHandler.error(res, error);
        }
    }
}

export const userController = new UserController(userService);