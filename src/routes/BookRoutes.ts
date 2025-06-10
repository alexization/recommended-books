import Router from '@koa/router';
import {bookController} from "../controllers/BookController";
import {jwtAuthMiddleware} from "../middlewares/JwtAuthMiddleware";

const bookRouter = new Router({
    prefix: '/books'
});

bookRouter.get('/', jwtAuthMiddleware, bookController.getBooks);

export default bookRouter;