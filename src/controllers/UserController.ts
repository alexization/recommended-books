import {Context} from "koa";
import {userService} from "../services/UserService";
import {ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto";
import {ErrorMessage} from "../utils/ErrorMessage";

export class UserController {
    constructor(private readonly userService: UserServiceInterface) {
        this.userService = userService;
    }

    createUser = async (ctx: Context): Promise<void> => {
        const createUserData = ctx.request.body as CreateUserData;

        this.validateEmail(createUserData.email);
        this.validateName(createUserData.name);

        const newUser = await this.userService.createUser(createUserData);

        ResponseHandler.success(ctx, '사용자가 정상적으로 등록되었습니다.', newUser);
    }

    findUserById = async (ctx: Context): Promise<void> => {
        const id = parseInt(ctx.params.id);

        const user = await this.userService.findUserById(id);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    findUserByEmail = async (ctx: Context): Promise<void> => {
        const email = ctx.query.email as string;

        this.validateEmail(email);

        const user = await this.userService.findUserByEmail(email);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    updateUser = async (ctx: Context): Promise<void> => {
        const id = parseInt(ctx.params.id);

        const updateUserData = ctx.request.body as UpdateUserData;

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
            throw new ValidationError(ErrorMessage.EMAIL_REQUIRED);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError(ErrorMessage.EMAIL_INVALID_FORMAT);
        }
    }

    validateName(name?: string): void {
        if (!name || name.trim() === '') {
            throw new ValidationError(ErrorMessage.NAME_REQUIRED);
        }
        if (name.length > 10) {
            throw new ValidationError(ErrorMessage.NAME_TOO_LONG);
        }
    }
}

export const userController = new UserController(userService);