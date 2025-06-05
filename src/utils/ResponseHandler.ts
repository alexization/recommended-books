import {Context} from "koa";

export class ResponseHandler {
    static success<T>(ctx: Context, message: string, data: T): void {
        ctx.status = 200;
        ctx.body = {
            status: 'success', message: message, data: data,
        };
    }

    static error(ctx: Context, message: string, statusCode: number): void {
        ctx.status = statusCode;
        ctx.body = {
            status: 'error', message: message,
        };
    }
}