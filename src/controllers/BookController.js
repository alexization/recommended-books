import {bookService} from "../services/BookService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {ValidationError} from "../utils/AppError.js";

export class BookController {

    constructor(bookService) {
        this.bookService = bookService;
    }

    async getRecommendedBooks(req, res) {
        try {
            const {numOfRows, pageNo} = req.query;

            if (isNaN(numOfRows) || numOfRows < 1 || numOfRows > 1000) {
                throw new ValidationError('조회할 데이터 개수는 1 ~ 1000개 범위여야 합니다.');
            }

            if (isNaN(pageNo) || pageNo < 1) {
                throw new ValidationError('페이지 번호는 1 이상이어야 합니다.');
            }

            const result = await this.bookService.getRecommendedBooks(req.query);

            ResponseHandler.success(res, result.message, {
                books: result.items,
                totalCount: result.totalCount,
                currentPage: pageNo,
                itemsPerPage: numOfRows,
            });
        } catch (error) {
            ResponseHandler.error(res, error.message, error);
        }
    }
}

export const bookController = new BookController(bookService);