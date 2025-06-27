import {BookData, CreateBookData} from "../dto/BookDto";

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

    static create(bookId: number, bookData: CreateBookData): Book {
        return new Book(bookId, bookData.title, bookData.author, bookData.publisher, bookData.publicationYear, new Date());
    }

    static fromJson(bookData: BookData) {
        return new Book(bookData.book_id, bookData.title, bookData.author, bookData.publisher, bookData.publication_year, bookData.created_at);
    }

    toPersistence() {
        return {
            book_id: this._id,
            title: this._title,
            author: this._author,
            publisher: this._publisher,
            publication_year: this._publicationYear,
            created_at: this._createdAt,
        }
    }
}