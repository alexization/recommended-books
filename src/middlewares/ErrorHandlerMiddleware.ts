import {Context, Next} from "koa";
import {AppError, BadRequestError, NotFoundError, ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {ErrorMessage} from "../utils/ErrorMessage";

export const errorHandlerMiddleware = async (ctx: Context, next: Next): Promise<void> => {
    try {
        await next();
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof ValidationError) {
            return ResponseHandler.error(ctx, error.message, 400);
        }

        if (error instanceof NotFoundError) {
            return ResponseHandler.error(ctx, error.message, 404);
        }

        if (error instanceof BadRequestError) {
            return ResponseHandler.error(ctx, error.message, 400);
        }

        if (error instanceof AppError) {
            return ResponseHandler.error(ctx, error.message, 400);
        }

        return ResponseHandler.error(ctx, ErrorMessage.UNEXPECTED_ERROR.message, 500);
    }
};