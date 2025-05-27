import {AppError, BadRequestError, NotFoundError, ValidationError} from "../utils/AppError.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";

export const errorHandlerMiddleware = (req, res, next) => {
    try {
        return next();
    } catch (error) {
        console.error({
            message: error.message, stack: error.stack,
        });

        if (error instanceof ValidationError) {
            return ResponseHandler.error(res, error.message, {statusCode: 400});
        }

        if (error instanceof NotFoundError) {
            return ResponseHandler.error(res, error.message, {statusCode: 404});
        }

        if (error instanceof BadRequestError) {
            return ResponseHandler.error(res, error.message, {statusCode: 400});
        }

        if (error instanceof AppError) {
            return ResponseHandler.error(res, error.message, {type: 'APP_ERROR', statusCode: 400});
        }

        return ResponseHandler.error(res, '예상치 못한 오류 입니다.', {statusCode: 500});
    }
};