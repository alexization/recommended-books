export class AppError extends Error {
    constructor(message: string, public readonly statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Not Found') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = 'Validation Failed') {
        super(message, 400);
    }
}