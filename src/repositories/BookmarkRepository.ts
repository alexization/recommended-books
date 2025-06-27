import {BookmarkRepositoryInterface} from "./interfaces/BookmarkRepositoryInterface";
import {Bookmark} from "../domain/Bookmark";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";
import {BookmarkData} from "../domain/dto/BookmarkDto";

export class BookmarkRepository implements BookmarkRepositoryInterface {
    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createBookmark(bookmark: Bookmark): Promise<void> {
        try {
            const data = bookmark.toPersistence();

            const query = `INSERT INTO bookmarks (user_id, book_id, created_at)
                           VALUES (?, ?, ?)`;

            await this.db.executeQuery(query, [data.user_id, data.book_id, data.created_at]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async deleteBookmark(userId: number, bookId: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM bookmarks
                           WHERE user_id = ?
                             AND book_id = ?`;

            await this.db.executeQuery(query, [userId, bookId]);


        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findBookmark(userId: number, bookId: number): Promise<Bookmark> {
        try {
            const query = `SELECT *
                           FROM bookmarks
                           WHERE user_id = ?
                             AND book_id = ?`;

            const bookmarkData = await this.db.executeQuery<BookmarkData[]>(query, [userId, bookId]);

            return Bookmark.fromJson(bookmarkData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findBookmarksByUserId(userId: number, page: number, limit: number): Promise<Bookmark[]> {
        try {
            const offset = (page - 1) * page;
            const query = `SELECT *
                           FROM bookmarks
                           WHERE user_id = ?
                           ORDER BY created_at DESC
                           LIMIT ? OFFSET ?`;

            const bookmarkData = await this.db.executeQuery<BookmarkData[]>(query, [userId, limit, offset]);

            return bookmarkData.map(data => Bookmark.fromJson(data));

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const bookmarkRepository = new BookmarkRepository();