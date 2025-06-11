import {AuthServiceInterface} from "../interfaces/AuthServiceInterface";
import {authService} from "../services/AuthService";
import {Context} from "koa";
import {LoginUserData} from "../domain/dto/UserDto";
import {ResponseHandler} from "../utils/ResponseHandler";
import {CookieUtils} from "../utils/CookieUtils";

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