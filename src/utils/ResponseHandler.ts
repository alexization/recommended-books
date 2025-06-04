import {ServerResponse} from "http";

export class ResponseHandler {
    static success<T>(res: ServerResponse, message: string, data: T): void {
        res.end(JSON.stringify({
            status: 'success', message: message, data
        }));
    }

    static error(res: ServerResponse, message: string, statusCode: number): void {
        res.end(JSON.stringify({
            status: 'error', message: message, statusCode
        }));
    }
}