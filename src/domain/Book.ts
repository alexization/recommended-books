import {BookData} from "./dto/BookDto.js";

export class Book {
    private readonly _id: number;
    private readonly _title: string;
    private readonly _author: string;
    private readonly _publisher: string;
    private readonly _publicationYear: number;
    private readonly _createdAt: Date;

    constructor(id: number, title: string, author: string, publisher: string, publicationYear: number, createdAt: Date) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._publisher = publisher;
        this._publicationYear = publicationYear;
        this._createdAt = createdAt;
    }

    get id(): number {
        return this._id
    }

    get title(): string {
        return this._title
    }

    get author(): string {
        return this._author
    }

    get publisher(): string {
        return this._publisher
    }

    get publicationYear(): number {
        return this._publicationYear
    }

    get createdAt(): Date {
        return this._createdAt
    }

    static fromJson(bookData: BookData) {
        return new Book(bookData.bookId, bookData.title, bookData.author, bookData.publisher, bookData.publicationYear, bookData.createdAt);
    }
}