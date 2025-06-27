import dotenv from 'dotenv';
import axios from "axios";
import {AppError} from "../exception/AppError";
import {BookServiceInterface} from "./interfaces/BookServiceInterface";
import {CreateBookData, OpenApiBookData, OpenApiBookJson} from "../domain/dto/BookDto.js";
import {ErrorMessage} from "../exception/ErrorMessage";
import {Book} from "../domain/entities/Book";
import {BookRepositoryInterface} from "../repositories/interfaces/BookRepositoryInterface";
import {bookRepository} from "../repositories/BookRepository";
import {User} from "../domain/aggregates/User";

dotenv.config();

export class BookService implements BookServiceInterface {
    private readonly bookRepository: BookRepositoryInterface;
    private readonly NUM_OF_ROWS = 10;
    private readonly baseUrl: string;

    constructor() {
        this.bookRepository = bookRepository;
        this.baseUrl = process.env.OPEN_API_BASE_URL as string;
    }

    async createBook(bookData: CreateBookData): Promise<void> {
        const book = Book.create(0, bookData);

        await this.bookRepository.createBook(book);
    }

    async getBookByTitleAndAuthor(title: string, author: string): Promise<Book> {
        const book = await this.bookRepository.findBookByTitleAndAuthor(title, author);

        if (!book) {
            throw new AppError(ErrorMessage.BOOK_NOT_FOUND);
        }

        return book;
    }

    async getBookById(id: number): Promise<Book> {
        const book = await this.bookRepository.findBookById(id);

        if (!book) {
            throw new AppError(ErrorMessage.BOOK_NOT_FOUND);
        }

        return book;
    }

    async findRecentBooks(pageNo: number): Promise<OpenApiBookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo);
            const response = await axios.get(url, {timeout: 10000})
            const bookJson = response.data.items as OpenApiBookJson[];

            return this.mapToOpenApiBookData(bookJson);

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async findBooksByTitle(pageNo: number, title: string): Promise<OpenApiBookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo) + `&bk_nm=${title}`;
            const response = await axios.get(url, {timeout: 10000});
            const bookJson = response.data.items as OpenApiBookJson[];

            return this.mapToOpenApiBookData(bookJson);

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async findBooksByAuthor(pageNo: number, author: string): Promise<OpenApiBookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo) + `&aut_nm=${author}`;
            const response = await axios.get(url, {timeout: 10000});
            const bookJson = response.data.items as OpenApiBookJson[];

            return this.mapToOpenApiBookData(bookJson);

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async getReservationAvailableBooks(pageNo: number, user: User): Promise<OpenApiBookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo);
            const response = await axios.get(url, {timeout: 10000});
            const bookJson = response.data.items as OpenApiBookJson[];

            const openApiBookData = this.mapToOpenApiBookData(bookJson);
            return openApiBookData.filter(book => book.loanStatus || user.canReserveBookOn(book.returnDate));

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    getReturnDate(startDate: Date, user: User): Date {
        return user.calculateReturnDate(startDate);
    }

    private buildBaseSearchUrl(pageNo: number): string {
        return `${this.baseUrl}?serviceKey=${process.env.OPEN_API_SERVICE_KEY}&numOfRows=${this.NUM_OF_ROWS}&pageNo=${pageNo}`;
    }

    private mapToOpenApiBookData(openApiBookJson: OpenApiBookJson[]): OpenApiBookData[] {
        return openApiBookJson.map(item => ({
            title: item.bk_nm,
            author: item.aut_nm,
            publisher: item.pblshr,
            loanStatus: item.loan_yn === 'Y',
            returnDate: new Date(item.rtn_ed)
        }));
    }
}

export const bookService = new BookService();