export class MiddlewareManager {

    constructor() {
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }

    async execute(req, res, finalHandler) {
        let currentIndex = 0;

        const next = async (error) => {
            if (error) {
                throw error;
            }

            if (currentIndex >= this.middlewares.length) {
                return await finalHandler(req, res);
            }

            const currentMiddleware = this.middlewares[currentIndex++];

            await currentMiddleware(req, res, next);
        };

        await next();
    }
}