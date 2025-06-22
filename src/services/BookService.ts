import dotenv from 'dotenv';
import axios from "axios";
import {AppError} from "../utils/AppError.js";
import {BookServiceInterface} from "./interfaces/BookServiceInterface";
import {BookData} from "../domain/dto/BookDto.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";
import {Book} from "../domain/Book";
import {BookRepositoryInterface} from "../repositories/interfaces/BookRepositoryInterface";
import {bookRepository} from "../repositories/BookRepository";

dotenv.config();

export class BookService implements BookServiceInterface {
    private readonly bookRepository: BookRepositoryInterface;
    private readonly NUM_OF_ROWS = 10;
    private readonly baseUrl: string;

    constructor() {
        this.bookRepository = bookRepository;
        this.baseUrl = process.env.OPEN_API_BASE_URL as string;
    }

    async findBookById(id: number): Promise<Book> {
        return await this.bookRepository.findBookById(id);
    }

    async getRecentBooks(pageNo: number): Promise<BookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo);

            const response = await axios.get(url, {timeout: 10000})

            return response.data as BookData[];

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async getBooksByTitle(pageNo: number, title: string): Promise<BookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo) + `&bk_nm=${title}`;

            const response = await axios.get(url, {timeout: 10000});

            return response.data as BookData[];

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    async getBooksByAuthor(pageNo: number, author: string): Promise<BookData[]> {
        try {
            const url = this.buildBaseSearchUrl(pageNo) + `&aut_nm=${author}`;

            const response = await axios.get(url, {timeout: 10000});

            return response.data as BookData[];

        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    buildBaseSearchUrl(pageNo: number): string {
        return `${this.baseUrl}?serviceKey=${process.env.OPEN_API_SERVICE_KEY}&numOfRows=${this.NUM_OF_ROWS}&pageNo=${pageNo}`;
    }
}

export const bookService = new BookService();