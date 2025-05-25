export class UserRouter {
    constructor() {
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: [],
        };
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    get(path, handler) {
        this.addRoute('GET', path, handler);
    }

    post(path, handler) {
        this.addRoute('POST', path, handler);
    }


}