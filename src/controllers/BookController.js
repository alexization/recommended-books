import {bookService} from "../services/BookService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {ValidationError} from "../utils/AppError.js";

export class BookController {

    constructor(bookService) {
        this.bookService = bookService;
    }

    async getBooks(req, res) {
        try {
            const {pageNo} = req.query;

            if (isNaN(pageNo) || pageNo < 1) {
                throw new ValidationError('페이지 번호는 1 이상이어야 합니다.');
            }

            const result = await this.bookService.getBooks(pageNo);

            ResponseHandler.success(res, result.message, {
                books: result.items, totalCount: result.totalCount, currentPage: pageNo,
            });
        } catch (error) {
            ResponseHandler.error(res, error.message, error);
        }
    }
}

export const bookController = new BookController(bookService);