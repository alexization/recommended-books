import {BookData, CreateBookData, OpenApiBookResponse} from "../../domain/dto/BookDto";
import {Book} from "../../domain/Book";

export interface BookServiceInterface {
    createBook(bookData: CreateBookData): Promise<void>;

    findBookByTitleAndAuthor(title: string, author: string): Promise<Book>;

    findBookById(id: number): Promise<Book>;

    getRecentBooks(pageNo: number): Promise<OpenApiBookResponse[]>;

    getBooksByTitle(pageNo: number, title: string): Promise<BookData[]>;

    getBooksByAuthor(pageNo: number, author: string): Promise<BookData[]>;
}