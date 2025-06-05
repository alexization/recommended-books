import Router from '@koa/router';
import {bookController} from "../controllers/BookController";

const bookRouter = new Router();

bookRouter.get('/books', async (ctx): Promise<void> => {
    await bookController.getBooks(ctx);
});

export default bookRouter;