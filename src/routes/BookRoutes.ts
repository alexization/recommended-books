import Router from '@koa/router';
import {bookController} from "../controllers/BookController";

const bookRouter = new Router({
    prefix: '/books'
});

bookRouter.get('/', async (ctx): Promise<void> => {
    await bookController.getBooks(ctx);
});

export default bookRouter;