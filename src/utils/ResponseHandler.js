export class ResponseHandler {
    static success(res, statusCode, message) {
        res.end(JSON.stringify({
            status: 'success', message: message,
        }));
    }

    static error(res, error) {
        res.end(JSON.stringify({
            status: 'error', message: error.message,
        }));
    }
}