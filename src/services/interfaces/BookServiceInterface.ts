import {CreateBookData, OpenApiBookData} from "../../domain/dto/BookDto";
import {Book} from "../../domain/Book";
import {User} from "../../domain/User";

export interface BookServiceInterface {
    createBook(bookData: CreateBookData): Promise<void>;

    findBookByTitleAndAuthor(title: string, author: string): Promise<Book>;

    findBookById(id: number): Promise<Book>;

    getRecentBooks(pageNo: number): Promise<OpenApiBookData[]>;

    getBooksByTitle(pageNo: number, title: string): Promise<OpenApiBookData[]>;

    getBooksByAuthor(pageNo: number, author: string): Promise<OpenApiBookData[]>;

    getReservationAvailableBooks(pageNo: number, user: User): Promise<OpenApiBookData[]>;

    getReturnDate(startDate: Date, user: User): Date;
}