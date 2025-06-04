import {userService} from "../services/UserService";
import {ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {ServerResponse} from "http";
import {UserRequest} from "../requests/UserRequest";
import {UserData} from "../domain/dto/UserDto";

export class UserController {
    constructor(private readonly userService: UserServiceInterface) {
        this.userService = userService;
    }

    async createUser(req: UserRequest, res: ServerResponse): Promise<void> {
        this.validateEmail(req.body.email);
        this.validateName(req.body.name);

        const newUser = await this.userService.createUser({...req.body});

        ResponseHandler.success(res, '사용자가 정상적으로 등록되었습니다.', newUser);
    }

    async findUserById(req: UserRequest, res: ServerResponse): Promise<void> {
        const user = await this.userService.findUserById(req.params.id);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    async findUserByEmail(req: UserRequest, res: ServerResponse): Promise<void> {
        this.validateEmail(req.query.email);

        const user = await this.userService.findUserByEmail(req.query.email);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    async updateUser(req: UserRequest, res: ServerResponse): Promise<void> {
        const userData: UserData = {
            id: 1,
            ...req.body,
            createdAt: "",
            updatedAt: "",
        };

        const updatedUser = await this.userService.updateUser(userData);
        ResponseHandler.success(res, '사용자 정보를 성공적으로 수정했습니다.', updatedUser);
    }

    async deleteUser(req: UserRequest, res: ServerResponse): Promise<void> {
        await this.userService.deleteUser(req.params.id);

        ResponseHandler.success(res, '사용자를 성공적으로 삭제했습니다.', null);
    }

    validateEmail(email?: string): void {
        if (!email || email.trim() === '') {
            throw new ValidationError("이메일은 필수 입력 사항입니다.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError("올바른 이메일 형식이 아닙니다.");
        }
    }

    validateName(name?: string): void {
        if (!name || name.trim() === '') {
            throw new ValidationError("이름은 필수 입력 사항입니다.");
        }
        if (name.length > 10) {
            throw new ValidationError("이름은 10글자 이내여야 합니다.");
        }
    }
}

export const userController = new UserController(userService);