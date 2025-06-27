import {Bookmark} from "../../domain/Bookmark";

export interface BookmarkRepositoryInterface {
    createBookmark(bookmark: Bookmark): Promise<void>;

    deleteBookmark(userId: number, bookId: number): Promise<void>;

    findBookmark(userId: number, bookId: number): Promise<Bookmark | null>;
}