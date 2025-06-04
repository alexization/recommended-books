import {URL} from 'url';
import {AppError, BadRequestError} from "./AppError";
import {ResponseHandler} from "./ResponseHandler";
import {Middleware, MiddlewareManager, RouteHandler} from "../middlewares/MiddlewareManager";
import {IncomingMessage, ServerResponse} from "http";

interface ExtendedIncomingMessage extends IncomingMessage {
    body?: any;
    query?: Record<string, string>;
    params?: Record<string, string>;
}

interface RouteMap {
    [path: string]: RouteHandler;
}

interface Routes {
    GET: RouteMap;
    POST: RouteMap;
    PUT: RouteMap;
    DELETE: RouteMap;
}

interface MatchResult {
    matched: boolean;
    params: Record<string, string>;
}

interface RouteResult {
    handler: RouteHandler | null;
    params: Record<string, string>;
}

export class Router {
    public readonly routes: Routes;
    public readonly middlewareManager: MiddlewareManager;

    constructor() {
        this.routes = {
            GET: {}, POST: {}, PUT: {}, DELETE: {},
        };
        this.middlewareManager = new MiddlewareManager();
    }

    get(path: string, handler: RouteHandler): this {
        this.routes.GET[path] = handler;
        return this;
    }

    post(path: string, handler: RouteHandler): this {
        this.routes.POST[path] = handler;
        return this;
    }

    put(path: string, handler: RouteHandler): this {
        this.routes.PUT[path] = handler;
        return this;
    }

    delete(path: string, handler: RouteHandler): this {
        this.routes.DELETE[path] = handler;
        return this;
    }

    use(router: Router) {
        Object.keys(router.routes).forEach(method => {
            const methodKey = method as keyof Routes;
            Object.keys(router.routes[methodKey]).forEach(path => {
                this.routes[methodKey][path] = router.routes[methodKey][path];
            });
        })

        router.middlewareManager.middlewares.forEach(middleware => {
            this.middlewareManager.use(middleware);
        })

        return this;
    }

    useMiddleware(middleware: Middleware): this {
        this.middlewareManager.use(middleware);
        return this;
    }

    async handleRequest(req: ExtendedIncomingMessage, res: ServerResponse): Promise<void> {
        try {
            const parsedUrl = new URL(req.url as string, `http://${req.headers.host}`);
            const path = parsedUrl.pathname;
            const method = req.method as string;

            await this.parseRequestBody(req);

            req.query = Object.fromEntries(parsedUrl.searchParams);

            const {handler, params} = this.findRoute(method, path);

            req.params = params;

            if (handler) {
                await this.middlewareManager.execute(req, res, handler);
            } else {
                ResponseHandler.error(res, '요청한 리소스를 찾을 수 없습니다.', 400);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                ResponseHandler.error(res, error.message, 500);
            }
        }
    }

    async parseRequestBody(req: ExtendedIncomingMessage): Promise<void> {
        return new Promise((resolve, reject) => {
            let body: string = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                try {
                    req.body = body ? JSON.parse(body) : {};
                    resolve();
                } catch (error) {
                    reject(new BadRequestError("잘못된 JSON 형식입니다."));
                }
            });

            req.on('error', (error) => {
                reject(new AppError(error.message, 400));
            });
        });
    }

    findRoute(method: string, path: string): RouteResult {
        const methodRoutes = this.routes[method as keyof Routes];

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

    matchDynamicRoute(routePath: string, requestPath: string): MatchResult {
        if (!routePath.includes(':')) {
            return {
                matched: routePath === requestPath, params: {}
            };
        }

        const paramNames: string[] = [];
        const regexPattern = routePath.replace(/:([a-zA-Z0-9_]+)/g, (match, paramName: string): string => {
            paramNames.push(paramName);
            return '([^/]+)';
        });

        const regex = new RegExp(`^${regexPattern}$`);
        const match = requestPath.match(regex);

        if (match) {
            const params: Record<string, string> = {};
            paramNames.forEach((name, index): void => {
                params[name] = match[index + 1];
            });

            return {matched: true, params};
        }

        return {matched: false, params: {}};
    }
}