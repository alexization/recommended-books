import {Bookmark} from "../../domain/entities/Bookmark";

export interface BookmarkRepositoryInterface {
    createBookmark(bookmark: Bookmark): Promise<void>;

    deleteBookmark(userId: number, bookId: number): Promise<void>;

    findBookmark(userId: number, bookId: number): Promise<Bookmark>;

    findBookmarksByUserId(userId: number, page: number, limit: number): Promise<Bookmark[]>;
}