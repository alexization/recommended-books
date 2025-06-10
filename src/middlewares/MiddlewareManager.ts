import {IncomingMessage, ServerResponse} from "http";
import {ExtendedIncomingMessage} from "../utils/Routes";

export type NextFunction = (error ?: Error) => Promise<void>;
export type RouteHandler<T = ExtendedIncomingMessage> = (req: T, res: ServerResponse) => Promise<void>;
export type Middleware = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => Promise<void>;

export class MiddlewareManager {

    public readonly middlewares: Middleware[] = [];

    use(middleware: Middleware): this {
        this.middlewares.push(middleware);
        return this;
    }

    async execute(req: ExtendedIncomingMessage, res: ServerResponse, finalHandler: RouteHandler): Promise<void> {
        let currentIndex = 0;

        const next: NextFunction = async (error?: Error): Promise<void> => {
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