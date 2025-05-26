import {userService} from "../services/UserService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {ValidationError} from "../utils/AppError.js";

export class UserController {

    constructor(userService) {
        this.userService = userService;
    }

    async createUser(req, res) {
        try {
            const {email, name, birth} = req.body;

            this.validateEmail(email);
            this.validateName(name);

            const newUser = await this.userService.createUser({email, name, birth,});

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
            const email = req.query.email;

            this.validateEmail(email);

            const user = await this.userService.findUserByEmail(email);
            ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
        } catch (error) {
            ResponseHandler.error(res, error);
        }
    }

    validateEmail(email) {
        if (!email || email.trim() === '') {
            throw new ValidationError("이메일은 필수 입력 사항입니다.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError("올바른 이메일 형식이 아닙니다.");
        }
    }

    validateName(name) {
        if (!name || name.trim() === '') {
            throw new ValidationError("이름은 필수 입력 사항입니다.");
        }
        if (name.length > 10) {
            throw new ValidationError("이름은10글자 이내여야 합니다.");
        }
    }

}

export const userController = new UserController(userService);