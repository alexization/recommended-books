import Router from '@koa/router';
import {bookController} from "../controllers/BookController";

const bookRouter = new Router({
    prefix: '/books'
});

bookRouter.get('/', bookController.getBooks);

export default bookRouter;