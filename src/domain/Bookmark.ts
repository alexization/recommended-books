import {BookmarkData} from "./dto/BookmarkDto";

export class Bookmark {
    private readonly _userId: number;
    private readonly _bookId: number;
    private readonly _createdAt: Date;

    constructor(userId: number, bookId: number, createdAt: Date) {
        this._userId = userId;
        this._bookId = bookId;
        this._createdAt = createdAt;
    }

    get userId(): number {
        return this._userId;
    }

    get bookId(): number {
        return this._bookId;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    static fromJson(bookmarkData: BookmarkData): Bookmark {
        return new Bookmark(bookmarkData.userId, bookmarkData.bookId, bookmarkData.createdAt);
    }
}