import {userService} from "../services/UserService";
import {Request, Response} from "express";
import {ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {UpdateUserData} from "../domain/dto/UserDto";

export class UserController {
    constructor(private readonly userService: UserServiceInterface) {
        this.userService = userService;
    }

    createUser = async (req: Request, res: Response): Promise<void> => {
        const {email, name} = req.body;

        this.validateEmail(email);
        this.validateName(name);

        const newUser = await this.userService.createUser({...req.body});

        ResponseHandler.success(res, '사용자가 정상적으로 등록되었습니다.', newUser);
    }

    findUserById = async (req: Request, res: Response): Promise<void> => {
        const user = await this.userService.findUserById(req.params.id);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    findUserByEmail = async (req: Request, res: Response): Promise<void> => {
        const email = req.query.email as string;
        this.validateEmail(email);

        const user = await this.userService.findUserByEmail(email);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        const updateUserData: UpdateUserData = {...req.body};

        await this.userService.updateUser(req.params.id, updateUserData);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 수정했습니다.', null);
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
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