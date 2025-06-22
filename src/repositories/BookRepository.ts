import {BookRepositoryInterface} from "./interfaces/BookRepositoryInterface";
import {Book} from "../domain/Book";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {BookData} from "../domain/dto/BookDto";
import {AppError} from "../utils/AppError";
import {ErrorMessage} from "../utils/ErrorMessage";

export class BookRepository implements BookRepositoryInterface {
    private db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async findBookById(id: number): Promise<Book> {
        try {
            const query = 'SELECT * FROM books WHERE book_id = ?';

            const bookData = await this.db.executeQuery<BookData[]>(query, [id]);

            return Book.fromJson(bookData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.UNEXPECTED_ERROR);
        }
    }
}

export const bookRepository = new BookRepository();