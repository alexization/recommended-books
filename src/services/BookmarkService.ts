import {BookmarkServiceInterface} from "./interfaces/BookmarkServiceInterface";
import {BookmarkRepositoryInterface} from "../repositories/interfaces/BookmarkRepositoryInterface";
import {bookmarkRepository} from "../repositories/BookmarkRepository";
import {Bookmark} from "../domain/entities/Bookmark";
import {AppError} from "../exception/AppError";
import {ErrorMessage} from "../exception/ErrorMessage";

export class BookmarkService implements BookmarkServiceInterface {
    private readonly bookmarkRepository: BookmarkRepositoryInterface;
    private readonly PAGE_SIZE = 10;

    constructor() {
        this.bookmarkRepository = bookmarkRepository;
    }

    async addBookmark(userId: number, bookId: number): Promise<void> {
        const bookmark = Bookmark.create(userId, bookId);

        await this.bookmarkRepository.createBookmark(bookmark);
    }

    async getBookmark(userId: number, bookId: number): Promise<Bookmark> {
        const bookmark = await this.bookmarkRepository.findBookmark(userId, bookId);

        if (!bookmark) {
            throw new AppError(ErrorMessage.BOOKMARK_NOT_FOUND);
        }

        return bookmark;
    }

    async findBookmarksByUserId(userId: number, page: number): Promise<Bookmark[]> {
        return await this.bookmarkRepository.findBookmarksByUserId(userId, page, this.PAGE_SIZE);
    }

    async removeBookmark(userId: number, bookId: number): Promise<void> {
        await this.getBookmark(userId, bookId);

        await this.bookmarkRepository.deleteBookmark(userId, bookId);
    }
}

export const bookmarkService = new BookmarkService();