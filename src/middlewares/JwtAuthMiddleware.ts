import {Context, Next} from "koa";
import {JwtUtils} from "../utils/JwtUtils.js";
import {authService} from "../services/AuthService.js";
import {CookieUtils} from "../utils/CookieUtils.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";
import {AppError} from "../utils/AppError";

const PUBLIC_PATTERNS: string[] = ['POST:/auth/login', 'POST:/users', 'GET:/users', 'GET:/users/:id', 'GET:/docs', 'GET:/favicon.png'];

function isPublicRequest(method: string, path: string): boolean {
    const requestPattern = `${method}:${path}`;

    return PUBLIC_PATTERNS.some(pattern => {
        if (pattern === requestPattern) {
            return true;
        }

        if (pattern.includes(':')) {
            const regexPattern = pattern
                .replace(/\//g, '\\/')
                .replace(/:[^\/]+/g, '[^\\/]+') + '$';

            const regex = new RegExp(regexPattern);
            return regex.test(requestPattern);
        }
        return false;
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

    } catch (error) {
        if (error instanceof AppError && error.message === ErrorMessage.ACCESS_TOKEN_EXPIRED.message) {
            const refreshToken = CookieUtils.getRefreshToken(ctx);

            if (!refreshToken) {
                throw new AppError(ErrorMessage.REFRESH_TOKEN_EXPIRED);
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

                throw new AppError(ErrorMessage.REFRESH_TOKEN_EXPIRED);
            }
        } else {
            throw error;
        }
    }
};