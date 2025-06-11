import {Context, Next} from "koa";
import {ResponseHandler} from "../utils/ResponseHandler";
import {JwtUtils} from "../utils/JwtUtils";
import {authService} from "../services/AuthService";

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
    } catch (error) {
        return ResponseHandler.error(ctx, "인증에 실패했습니다.", 401);
    }
};