import {Context} from "koa";
import {userService} from "../services/UserService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {UserServiceInterface} from "../services/interfaces/UserServiceInterface";
import {
    CreateUserSchema,
    FindUserByEmailSchema,
    ParamsIdSchema,
    UpdateUserSchema,
    UserPasswordSchema
} from "../validations/UserValidation";

export class UserController {
    private readonly userService: UserServiceInterface;

    constructor() {
        this.userService = userService;
    }

    createUser = async (ctx: Context): Promise<void> => {
        const createUserData = CreateUserSchema.parse(ctx.request.body);

        await this.userService.createUser(createUserData);

        ResponseHandler.success(ctx, '사용자가 정상적으로 등록되었습니다.');
    }

    getUserById = async (ctx: Context): Promise<void> => {
        const id = ParamsIdSchema.parse(ctx.params.id);
        const user = await this.userService.getUserById(id);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    getUserByEmail = async (ctx: Context): Promise<void> => {
        const email = FindUserByEmailSchema.parse(ctx.query.email);
        const user = await this.userService.getUserByEmail(email);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    updateUser = async (ctx: Context): Promise<void> => {
        const id = ParamsIdSchema.parse(ctx.params.id);
        const updateUserData = UpdateUserSchema.parse(ctx.request.body);

        await this.userService.updateUser(id, updateUserData);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 수정했습니다.');
    }

    deleteUser = async (ctx: Context): Promise<void> => {
        const id = ParamsIdSchema.parse(ctx.params.id);

        await this.userService.deleteUser(id);

        ResponseHandler.success(ctx, '사용자를 성공적으로 삭제했습니다.');
    }

    changePassword = async (ctx: Context): Promise<void> => {
        const id = ParamsIdSchema.parse(ctx.params.id);
        const newPassword = UserPasswordSchema.parse(ctx.request.body);

        await this.userService.changePassword(id, newPassword);

        ResponseHandler.success(ctx, '비밀번호를 성공적으로 변경했습니다.');
    }
}

export const userController = new UserController();