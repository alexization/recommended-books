import {AppError, BadRequestError, NotFoundError, ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {IncomingMessage, ServerResponse} from "http";
import {NextFunction} from "./MiddlewareManager";

export const errorHandlerMiddleware = async (req: IncomingMessage, res: ServerResponse, next: NextFunction) => {
    try {
        await next();
    } catch (error: any) {
        console.error({
            message: error.message, stack: error.stack,
        })

        if (error instanceof ValidationError) {
            return ResponseHandler.error(res, error.message, 400);
        }

        if (error instanceof NotFoundError) {
            return ResponseHandler.error(res, error.message, 404);
        }

        if (error instanceof BadRequestError) {
            return ResponseHandler.error(res, error.message, 400);
        }

        if (error instanceof AppError) {
            return ResponseHandler.error(res, error.message, 400);
        }

        return ResponseHandler.error(res, '예상치 못한 오류 입니다.', 500);
    }
};