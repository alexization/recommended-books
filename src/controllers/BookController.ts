import {Context} from "koa";
import {bookService} from "../services/BookService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {BookServiceInterface} from "../interfaces/BookServiceInterface.js";
import {BookAuthorSchema, BookTitleSchema, PageNumberSchema} from "../validations/BookValidation";

export class BookController {
    constructor(private readonly bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    getRecentBooks = async (ctx: Context): Promise<void> => {
        const pageNo = PageNumberSchema.parse(ctx.query.pageNo);

        const bookData = await this.bookService.getRecentBooks(pageNo);

        ResponseHandler.success(ctx, `${pageNo}번 페이지 도서를 성공적으로 가져왔습니다.`, bookData);
    }

    getBooksByTitle = async (ctx: Context): Promise<void> => {
        const pageNo = PageNumberSchema.parse(ctx.query.pageNo);
        const title = BookTitleSchema.parse(ctx.query.title);

        const bookData = await this.bookService.getBooksByTitle(pageNo, title);

        ResponseHandler.success(ctx, '검색 완료', bookData);
    };

    getBooksByAuthor = async (ctx: Context): Promise<void> => {
        const pageNo = PageNumberSchema.parse(ctx.query.pageNo);
        const author = BookAuthorSchema.parse(ctx.query.author);

        const bookData = await this.bookService.getBooksByAuthor(pageNo, author);

        ResponseHandler.success(ctx, '검색 완료', bookData);
    };
}

export const bookController = new BookController(bookService);