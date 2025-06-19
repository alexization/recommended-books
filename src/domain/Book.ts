export class Book {
    private readonly id: number;
    private readonly title: string;
    private readonly author: string;
    private readonly publisher: string;
    private readonly publicationYear: number;
    private readonly createdAt: Date;

    constructor(id: number, title: string, author: string, publisher: string, publicationYear: number, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.publicationYear = publicationYear;
        this.createdAt = createdAt;
    }

    get getId(): number {
        return this.id
    }

    get getTitle(): string {
        return this.title
    }

    get getAuthor(): string {
        return this.author
    }

    get getPublisher(): string {
        return this.publisher
    }

    get getPublicationYear(): number {
        return this.publicationYear
    }

    get getCreatedAt(): Date {
        return this.createdAt
    }
}