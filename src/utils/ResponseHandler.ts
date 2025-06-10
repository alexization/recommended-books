import {Response} from "express";

export class ResponseHandler {
    static success<T>(res: Response, message: string, data: T): void {
        res.status(200).send(JSON.stringify({
            status: 'success',
            message: message,
            data
        }));
    }

    static error(res: Response, message: string, statusCode: number): void {
        res.status(statusCode).send(JSON.stringify({
            status: 'error',
            message: message
        }));
    }
}