import Router from '@koa/router';
import {bookController} from "../controllers/BookController.js";

const bookRouter = new Router({
    prefix: '/books'
});

/**
 * @swagger
 * /books:
 *  post:
 *      summary: 신규 도서 등록
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateBookData'
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.post('/', bookController.createBook);

/**
 * @swagger
 * /books/by-title-author:
 *  get:
 *      summary: 도서 조회 (도서명 & 저자명)
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: title
 *            required: true
 *            schema:
 *              type: string
 *          - in: query
 *            name: author
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.get('/by-title-author', bookController.findBookByTitleAndAuthor);

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
bookRouter.get('/recent', bookController.getRecentBooks);

/**
 * @swagger
 * /books/by-title:
 *  get:
 *      summary: 도서 조회 (도서명)
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: pageNo
 *            required: true
 *            schema:
 *              type: integer
 *          - in: query
 *            name: title
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.get('/by-title', bookController.getBooksByTitle);

/**
 * @swagger
 * /books/by-author:
 *  get:
 *      summary: 도서 조회 (저자명)
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: pageNo
 *            required: true
 *            schema:
 *              type: integer
 *          - in: query
 *            name: author
 *            required: true
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.get('/by-author', bookController.getBooksByAuthor);

/**
 * @swagger
 * /books/return-date:
 *  get:
 *      summary: 반납 예정 날짜 조회
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: query
 *            name: startDate
 *            required: true
 *            schema:
 *              type: string
 *              format: date
 *              example: "2025-01-01"
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.get('/return-date', bookController.getReturnDate);

/**
 * @swagger
 * /books/available/reservation:
 *  get:
 *      summary: 예약 가능 도서 조회
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
bookRouter.get('/available/reservation', bookController.getReservationAvailableBooks);

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      summary: 도서 조회 (도서 ID)
 *      tags: [Books]
 *      security:
 *          - BearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: 성공
 * */
bookRouter.get('/:id', bookController.findBookById);


export default bookRouter;