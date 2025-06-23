import {Context} from "koa";
import {bookService} from "../services/BookService.js";
import {ResponseHandler} from "../utils/ResponseHandler.js";
import {BookServiceInterface} from "../services/interfaces/BookServiceInterface";
import {
    BookAuthorSchema,
    BookIdSchema,
    BookTitleSchema,
    CreateBookSchema,
    PageNumberSchema
} from "../validations/BookValidation";

export class BookController {
    constructor(private readonly bookService: BookServiceInterface) {
        this.bookService = bookService;
    }

    createBook = async (ctx: Context): Promise<void> => {
        const bookData = CreateBookSchema.parse(ctx.request.body);

        await this.bookService.createBook(bookData);

        ResponseHandler.success(ctx, '도서 정보를 성공적으로 등록했습니다.');
    }

    findBookByTitleAndAuthor = async (ctx: Context): Promise<void> => {
        const title = BookTitleSchema.parse(ctx.query.title);
        const author = BookAuthorSchema.parse(ctx.query.author);

        const bookData = await this.bookService.findBookByTitleAndAuthor(title, author);

        ResponseHandler.success(ctx, '도서 정보를 성공적으로 가져왔습니다.', bookData);
    };

    findBookById = async (ctx: Context): Promise<void> => {
        const id = BookIdSchema.parse(ctx.params.id);

        const bookData = await this.bookService.findBookById(id);

        ResponseHandler.success(ctx, '도서 정보를 성공적으로 가져왔습니다.', bookData);
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

    getReservationAvailableBooks = async (ctx: Context): Promise<void> => {
        const pageNo = PageNumberSchema.parse(ctx.query.pageNo);

        const bookData = await this.bookService.getReservationAvailableBooks(pageNo, ctx.state.user);

        ResponseHandler.success(ctx, '예약 가능한 도서 목록을 성공적으로 반환했습니다.', bookData);
    };
}

export const bookController = new BookController(bookService);