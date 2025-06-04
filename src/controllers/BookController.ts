import {bookService} from "../services/BookService";
import {Response} from "express";
import {ResponseHandler} from "../utils/ResponseHandler";
import {ValidationError} from "../utils/AppError";
import {BookServiceInterface} from "../interfaces/BookServiceInterface";
import {BookRequest} from "../requests/BookRequest";

export class BookController {
    constructor(private readonly bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    async getBooks(req: BookRequest, res: Response): Promise<void> {
        const pageNo = req.query.pageNo;
        const numberPageNo = Number(pageNo);

        if (isNaN(numberPageNo) || numberPageNo < 1) {
            throw new ValidationError('페이지 번호는 1 이상이어야 합니다.');
        }

        const bookData = await this.bookService.getBooks(pageNo);

        ResponseHandler.success(res, `${pageNo}번 페이지 도서를 성공적으로 가져왔습니다.`, bookData);
    }
}

export const bookController = new BookController(bookService);