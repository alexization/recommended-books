import {Context} from "koa";
import {userService} from "../services/UserService";
import {ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {UpdateUserData} from "../domain/dto/UserDto";

export class UserController {
    constructor(private readonly userService: UserServiceInterface) {
        this.userService = userService;
    }

    createUser = async (ctx: Context): Promise<void> => {
        this.validateEmail(ctx.request.body.email);
        this.validateName(ctx.request.body.name);

        const newUser = await this.userService.createUser({...ctx.request.body});

        ResponseHandler.success(ctx, '사용자가 정상적으로 등록되었습니다.', newUser);
    }

    findUserById = async (ctx: Context): Promise<void> => {
        const id = parseInt(ctx.params.id);

        const user = await this.userService.findUserById(id);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    findUserByEmail = async (ctx: Context): Promise<void> => {
        const email = ctx.request.body.email as string;

        this.validateEmail(email);

        const user = await this.userService.findUserByEmail(email);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    updateUser = async (ctx: Context): Promise<void> => {
        const id = parseInt(ctx.params.id);

        const updateUserData: UpdateUserData = {...ctx.request.body};

        await this.userService.updateUser(id, updateUserData);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 수정했습니다.');
    }

    deleteUser = async (ctx: Context): Promise<void> => {
        const id = parseInt(ctx.params.id);

        await this.userService.deleteUser(id);

        ResponseHandler.success(ctx, '사용자를 성공적으로 삭제했습니다.');
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