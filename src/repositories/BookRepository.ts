import {BookRepositoryInterface} from "./interfaces/BookRepositoryInterface";
import {Book} from "../domain/entities/Book";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {BookData} from "../domain/dto/BookDto";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class BookRepository implements BookRepositoryInterface {
    private db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async save(book: Book): Promise<void> {
        try {
            const data = book.toPersistence();

            const query = `INSERT INTO books (title, author, publisher, publication_year, created_at)
                           VALUES (?, ?, ?, ?, ?)`;

            await this.db.executeQuery(query, [data.title, data.author, data.publisher, data.publication_year, data.created_at]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findByTitleAndAuthor(title: string, author: string): Promise<Book> {
        try {
            const query = `SELECT *
                           FROM books
                           WHERE title = ?
                             AND author = ?`;

            const bookData = await this.db.executeQuery<BookData[]>(query, [title, author]);

            return Book.fromJson(bookData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findById(id: number): Promise<Book> {
        try {
            const query = `SELECT *
                           FROM books
                           WHERE book_id = ?`;

            const bookData = await this.db.executeQuery<BookData[]>(query, [id]);

            return Book.fromJson(bookData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const bookRepository = new BookRepository();