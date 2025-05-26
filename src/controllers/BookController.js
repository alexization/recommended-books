import {bookService} from "../services/BookService.js";

export class BookController {

    constructor(bookService) {
        this.bookService = bookService;
    }
}

export const bookController = new BookController(bookService);