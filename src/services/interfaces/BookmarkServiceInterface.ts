import {Bookmark} from "../../domain/Bookmark";

export interface BookmarkServiceInterface {
    addBookmark(userId: number, bookId: number): Promise<void>;

    removeBookmark(userId: number, bookId: number): Promise<void>;

    getBookmarksByUserId(userId: number, page: number): Promise<Bookmark[]>;
}