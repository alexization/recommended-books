import {Context} from "koa";
import {userService} from "../services/UserService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {UserServiceInterface} from "../interfaces/UserServiceInterface.js";
import {CreateUserScheme, FindUserByEmailScheme, ParamsIdScheme, UpdateUserScheme} from "../validations/UserValidation";

export class UserController {
    constructor(private readonly userService: UserServiceInterface) {
        this.userService = userService;
    }

    createUser = async (ctx: Context): Promise<void> => {
        const createUserData = CreateUserScheme.parse(ctx.request.body);

        const newUser = await this.userService.createUser(createUserData);

        ResponseHandler.success(ctx, '사용자가 정상적으로 등록되었습니다.', newUser);
    }

    findUserById = async (ctx: Context): Promise<void> => {
        const id = ParamsIdScheme.parse(ctx.params.id);

        const user = await this.userService.findUserById(id);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    findUserByEmail = async (ctx: Context): Promise<void> => {
        const email = FindUserByEmailScheme.parse(ctx.query.email);

        const user = await this.userService.findUserByEmail(email);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    updateUser = async (ctx: Context): Promise<void> => {
        const id = ParamsIdScheme.parse(ctx.params.id);

        const updateUserData = UpdateUserScheme.parse(ctx.request.body);

        await this.userService.updateUser(id, updateUserData);

        ResponseHandler.success(ctx, '사용자 정보를 성공적으로 수정했습니다.');
    }

    deleteUser = async (ctx: Context): Promise<void> => {
        const id = ParamsIdScheme.parse(ctx.params.id);

        await this.userService.deleteUser(id);

        ResponseHandler.success(ctx, '사용자를 성공적으로 삭제했습니다.');
    }
}

export const userController = new UserController(userService);