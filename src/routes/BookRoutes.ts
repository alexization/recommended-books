import Router from '@koa/router';
import {bookController} from "../controllers/BookController.js";

const bookRouter = new Router({
    prefix: '/books'
});

/**
 * @swagger
 * /books/recent:
 *  get:
 *      summary: 도서 조회 (최신순)
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: pageNo
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.get('/recent', bookController.getBooks);

export default bookRouter;