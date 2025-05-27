import {URL} from 'url';
import {AppError} from "./AppError.js";
import {ResponseHandler} from "./ResponseHandler.js";
import {MiddlewareManager} from "../middlewares/MiddlewareManager.js";

export class Router {
    constructor() {
        this.routes = {
            GET: {}, POST: {}, PUT: {}, DELETE: {},
        };
        this.middlewareManager = new MiddlewareManager();
    }

    get(path, handler) {
        this.routes.GET[path] = handler;
        return this;
    }

    post(path, handler) {
        this.routes.POST[path] = handler;
        return this;
    }

    put(path, handler) {
        this.routes.PUT[path] = handler;
        return this;
    }

    delete(path, handler) {
        this.routes.DELETE[path] = handler;
        return this;
    }

    use(router) {
        Object.keys(router.routes).forEach(method => {
            Object.keys(router.routes[method]).forEach(path => {
                this.routes[method][path] = router.routes[method][path];
            });
        })

        router.middlewareManager.middlewares.forEach(middleware => {
            this.middlewareManager.use(middleware);
        })

        return this;
    }

    useMiddleware(middleware) {
        this.middlewareManager.use(middleware);
        return this;
    }

    async handleRequest(req, res) {
        try {
            const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
            const path = parsedUrl.pathname;
            const method = req.method;

            await this.parseRequestBody(req);

            req.query = Object.fromEntries(parsedUrl.searchParams);
            req.params = {};

            const {handler, params} = this.findRoute(method, path);

            if (handler) {
                await this.middlewareManager.execute(req, res, handler);
            } else {
                ResponseHandler.error(res, '요청한 리소스를 찾을 수 없습니다.');
            }
        } catch (error) {
            ResponseHandler.error(res, '서버 내부 오류가 발생했습니다.');
        }
    }

    async parseRequestBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    req.body = body ? JSON.parse(body) : {};
                    resolve();
                } catch (error) {
                    reject(new AppError("잘못된 JSON 형식입니다.", 400));
                }
            });

            req.on('error', (error) => {
                reject(new AppError(error.message, 400));
            });
        });
    }

    findRoute(method, path) {
        const methodRoutes = this.routes[method];

        if (!methodRoutes) {
            return {handler: null, params: {}};
        }

        if (methodRoutes[path]) {
            return {handler: methodRoutes[path], params: {}};
        }

        for (const routePath in methodRoutes) {
            const matchResult = this.matchDynamicRoute(routePath, path);

            if (matchResult.matched) {
                return {
                    handler: methodRoutes[routePath], params: matchResult.params
                };
            }
        }
        return {handler: null, params: {}};
    }

    matchDynamicRoute(routePath, requestPath) {
        if (!routePath.includes(':')) {
            return {
                matched: routePath === requestPath, params: {}
            };
        }

        const paramNames = [];
        const regexPattern = routePath.replace(/:([a-zA-Z0-9_]+)/g, (match, paramName) => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        const regex = new RegExp(`^${regexPattern}$`);
        const match = requestPath.match(regex);

        if (match) {
            const params = {};
            paramNames.forEach((name, index) => {
                params[name] = match[index + 1];
            });

            return {matched: true, params};
        }

        return {matched: false, params: {}};
    }
}