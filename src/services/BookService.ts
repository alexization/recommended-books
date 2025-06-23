import dotenv from 'dotenv';
import axios from "axios";
import {AppError} from "../utils/AppError.js";
import {BookServiceInterface} from "./interfaces/BookServiceInterface";
import {CreateBookData, OpenApiBookData, OpenApiBookJson} from "../domain/dto/BookDto.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";
import {Book} from "../domain/Book";
import {BookRepositoryInterface} from "../repositories/interfaces/BookRepositoryInterface";
import {bookRepository} from "../repositories/BookRepository";
import {User} from "../domain/User";

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
        return await this.bookRepository.createBook(bookData);
    }

    async findBookByTitleAndAuthor(title: string, author: string): Promise<Book> {
        return await this.bookRepository.findBookByTitleAndAuthor(title, author);
    }

    async findBookById(id: number): Promise<Book> {
        return await this.bookRepository.findBookById(id);
    }

    async getRecentBooks(pageNo: number): Promise<OpenApiBookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo);

            const response = await axios.get(url, {timeout: 10000})

            const bookJson = response.data.items as OpenApiBookJson[];

            return this.mapToOpenApiBookData(bookJson);

        } catch (error) {
            console.error(error);
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async getBooksByTitle(pageNo: number, title: string): Promise<OpenApiBookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo) + `&bk_nm=${title}`;

            const response = await axios.get(url, {timeout: 10000});

            const bookJson = response.data.items as OpenApiBookJson[];

            return this.mapToOpenApiBookData(bookJson);

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async getBooksByAuthor(pageNo: number, author: string): Promise<OpenApiBookData[]> {
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

            return openApiBookData.filter(book => book.loanStatus || user.isAvailableReservation(book.returnDate));

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
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