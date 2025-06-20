import Router from '@koa/router';
import {bookController} from "../controllers/BookController.js";

const bookRouter = new Router({
    prefix: '/books'
});

bookRouter.get('/', bookController.getBooks);

export default bookRouter;