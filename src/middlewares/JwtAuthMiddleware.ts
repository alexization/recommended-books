import {Context, Next} from "koa";
import {ResponseHandler} from "../utils/ResponseHandler";
import {JwtUtils} from "../utils/JwtUtils";
import {authService} from "../services/AuthService";

export const jwtAuthMiddleware = async (ctx: Context, next: Next): Promise<void> => {
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