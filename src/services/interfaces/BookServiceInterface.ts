import {CreateBookData, OpenApiBookData} from "../../domain/dto/BookDto";
import {Book} from "../../domain/Book";
import {User} from "../../domain/User";

export interface BookServiceInterface {
    createBook(bookData: CreateBookData): Promise<void>;

    getBookByTitleAndAuthor(title: string, author: string): Promise<Book>;

    getBookById(id: number): Promise<Book>;

    findRecentBooks(pageNo: number): Promise<OpenApiBookData[]>;

    findBooksByTitle(pageNo: number, title: string): Promise<OpenApiBookData[]>;

    findBooksByAuthor(pageNo: number, author: string): Promise<OpenApiBookData[]>;

    getReservationAvailableBooks(pageNo: number, user: User): Promise<OpenApiBookData[]>;

    getReturnDate(startDate: Date, user: User): Date;
}