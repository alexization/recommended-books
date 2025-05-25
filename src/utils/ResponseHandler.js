export class ResponseHandler {
    static success(res, data = null, message) {
        res.end(JSON.stringify({
            status: 'success', message: message, data
        }));
    }

    static error(res, message, error = null) {
        res.end(JSON.stringify({
            status: 'error', message: message,
        }));
    }
}