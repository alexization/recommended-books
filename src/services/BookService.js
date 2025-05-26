import dotenv from 'dotenv';

dotenv.config();

export class BookService {

    constructor() {
        this.baseUrl = process.env.OPEN_API_BASE_URL;
    }

}

export const bookService = new BookService();