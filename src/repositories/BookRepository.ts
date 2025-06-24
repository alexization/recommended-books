import {BookRepositoryInterface} from "./interfaces/BookRepositoryInterface";
import {Book} from "../domain/Book";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {BookData, CreateBookData} from "../domain/dto/BookDto";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class BookRepository implements BookRepositoryInterface {
    private db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createBook(bookData: CreateBookData): Promise<void> {
        try {
            const newBook = Book.create(bookData);

            const query = `INSERT INTO books (title, author, publisher, publication_year, created_at)
                           VALUES (?, ?, ?, ?, ?)`;

            await this.db.executeQuery(query, [newBook.title, newBook.author, newBook.publisher, newBook.publicationYear, newBook.createdAt]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findBookByTitleAndAuthor(title: string, author: string): Promise<Book> {
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

    async findBookById(id: number): Promise<Book> {
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