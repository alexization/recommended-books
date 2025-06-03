import {bookService} from "../services/BookService";
import {ResponseHandler} from "../utils/ResponseHandler";
import {ValidationError} from "../utils/AppError";
import {BookServiceInterface} from "../interfaces/BookServiceInterface";
import {IncomingMessage, ServerResponse} from "http";

interface ExtendedIncomingMessage extends IncomingMessage {
    query: {
        pageNo: number;
    };
}

export class BookController {
    private readonly bookService: BookServiceInterface;

    constructor(bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    async getBooks(req: ExtendedIncomingMessage, res: ServerResponse): Promise<void> {
        const pageNo = req.query.pageNo;

        if (isNaN(pageNo) || pageNo < 1) {
            throw new ValidationError('페이지 번호는 1 이상이어야 합니다.');
        }

        const result = await this.bookService.getBooks(pageNo);

        ResponseHandler.success(res, result.message, result.items);
    }
}

export const bookController = new BookController(bookService);