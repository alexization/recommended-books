import {Context} from "koa";

export class CookieUtils {

    static setRefreshTokenCookie(ctx: Context, refreshToken: string): void {
        ctx.cookies.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
    }

    static clearRefreshToken(ctx: Context): void {
        ctx.cookies.set('refreshToken', '', {
            maxAge: 0, path: '/', httpOnly: true,
        });
    }

    static getRefreshToken(ctx: Context): string | undefined {
        return ctx.cookies.get('refreshToken');
    }
}