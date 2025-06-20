import {ErrorMessageType} from "./ErrorMessage.js";

export class AppError extends Error {
    public readonly statusCode: number;

    constructor(error: ErrorMessageType) {
        super(error.message);
        this.statusCode = error.code;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(error: ErrorMessageType) {
        super(error);
    }
}

export class NotFoundError extends AppError {
    constructor(error: ErrorMessageType) {
        super(error);
    }
}

export class ValidationError extends AppError {
    constructor(error: ErrorMessageType) {
        super(error);
    }
}