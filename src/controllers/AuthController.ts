import {Context} from "koa";
import {AuthServiceInterface} from "../interfaces/AuthServiceInterface.js";
import {authService} from "../services/AuthService.js";
import {LoginUserData} from "../domain/dto/UserDto.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {CookieUtils} from "../utils/CookieUtils.js";

export class AuthController {

    constructor(private readonly authService: AuthServiceInterface) {
        this.authService = authService;
    }

    login = async (ctx: Context): Promise<void> => {
        const loginUserData = ctx.request.body as LoginUserData;

        const tokens = await this.authService.login(loginUserData);

        CookieUtils.setRefreshTokenCookie(ctx, tokens.refreshToken)

        ResponseHandler.success(ctx, "성공적으로 로그인했습니다.", tokens.accessToken);
    };
}

export const authController = new AuthController(authService);