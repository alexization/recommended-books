import {Bookmark} from "../../domain/entities/Bookmark";

export interface BookmarkRepositoryInterface {
    save(bookmark: Bookmark): Promise<void>;

    delete(userId: number, bookId: number): Promise<void>;

    findByUserIdAndBookId(userId: number, bookId: number): Promise<Bookmark>;

    findByUserId(userId: number, page: number, limit: number): Promise<Bookmark[]>;
}