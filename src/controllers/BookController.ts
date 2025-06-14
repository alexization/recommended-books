import {Context} from "koa";
import {bookService} from "../services/BookService";
import {ResponseHandler} from "../utils/ResponseHandler";
import {ValidationError} from "../utils/AppError";
import {BookServiceInterface} from "../interfaces/BookServiceInterface";
import {ErrorMessage} from "../utils/ErrorMessage";

export class BookController {
    constructor(private readonly bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    getBooks = async (ctx: Context): Promise<void> => {
        const pageNo = parseInt(ctx.query.pageNo as string);

        if (isNaN(pageNo) || pageNo < 1) {
            throw new ValidationError(ErrorMessage.BOOK_PAGE_NUMBER_INVALID);
        }

        const bookData = await this.bookService.getBooks(pageNo);

        ResponseHandler.success(ctx, `${pageNo}번 페이지 도서를 성공적으로 가져왔습니다.`, bookData);
    }
}

export const bookController = new BookController(bookService);