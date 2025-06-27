import {Bookmark} from "../../domain/entities/Bookmark";

export interface BookmarkServiceInterface {
    addBookmark(userId: number, bookId: number): Promise<void>;

    removeBookmark(userId: number, bookId: number): Promise<void>;

    getBookmark(userId: number, bookId: number): Promise<Bookmark>;

    findBookmarksByUserId(userId: number, page: number): Promise<Bookmark[]>;
}