import Router from '@koa/router';
import {bookController} from "../controllers/BookController.js";

const bookRouter = new Router({
    prefix: '/books'
});

/**
 * @swagger
 * /books:
 *  get:
 *      summary: 경기도 용인시 신간 도서 조회
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
bookRouter.get('/', bookController.getBooks);

export default bookRouter;