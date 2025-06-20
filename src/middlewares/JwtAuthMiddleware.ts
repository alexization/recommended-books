import {Context, Next} from "koa";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {JwtUtils} from "../utils/JwtUtils.js";
import {authService} from "../services/AuthService.js";
import {CookieUtils} from "../utils/CookieUtils.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";

const PUBLIC_PATTERNS: string[] = ['POST:/auth/login', 'POST:/users', 'GET:/users', 'GET:/users/:id',];

function isPublicRequest(method: string, path: string): boolean {
    const requestPattern = `${method}:${path}`;

    return PUBLIC_PATTERNS.some(pattern => {
        return pattern === requestPattern;
    });
}

export const jwtAuthMiddleware = async (ctx: Context, next: Next): Promise<void> => {

    if (isPublicRequest(ctx.method, ctx.path)) {
        ctx.state.user = null;
        return await next();
    }

    try {
        const authHeader = ctx.headers.authorization;
        const token = JwtUtils.extractToken(authHeader);

        const user = await authService.validateAccessToken(token);
        ctx.state.user = user;

        await next();

    } catch (error: any) {
        if (error === ErrorMessage.ACCESS_TOKEN_EXPIRED) {
            const refreshToken = CookieUtils.getRefreshToken(ctx);

            if (!refreshToken) {
                return ResponseHandler.error(ctx, '다시 로그인해주세요.', 401);
            }

            try {
                const {user, tokenPair} = await authService.refreshToken(refreshToken);
                ctx.state.user = user;

                CookieUtils.setRefreshTokenCookie(ctx, tokenPair.refreshToken);

                ctx.set('X-New-Access-Token', tokenPair.accessToken);
                ctx.set('X-Token-Refreshed', 'true');

                await next();

            } catch (error) {
                CookieUtils.clearRefreshToken(ctx);

                return ResponseHandler.error(ctx, '다시 로그인해주세요.', 401);
            }
        } else {
            return ResponseHandler.error(ctx, '유효하지 않는 토큰입니다.', 401);
        }
    }
};