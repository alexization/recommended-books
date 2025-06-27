import dotenv from 'dotenv';
import axios from "axios";
import {AppError} from "../utils/AppError.js";
import {BookServiceInterface} from "../interfaces/BookServiceInterface.js";
import {BookData} from "../domain/dto/BookDto.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";

dotenv.config();

export class BookService implements BookServiceInterface {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.OPEN_API_BASE_URL as string;
    }

    async getBooks(pageNo: number): Promise<BookData[]> {
        try {
            const url = this.buildBookSearchUrl(pageNo);

            const response = await axios.get(url, {timeout: 10000})

            return response.data as BookData[];
        } catch (error) {
            throw new AppError(ErrorMessage.API_CALL_ERROR);
        }
    }

    buildBookSearchUrl(pageNo: number): string {
        const params = new URLSearchParams({
            numOfRows: '10', pageNo: pageNo.toString(),
        });
        return `${this.baseUrl}?serviceKey=${process.env.OPEN_API_SERVICE_KEY}&${params.toString()}`;
    }
}

export const bookService = new BookService();