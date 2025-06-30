import {Book} from "../../domain/entities/Book";

export interface BookRepositoryInterface {
    save(book: Book): Promise<void>;

    findByTitleAndAuthor(title: string, author: string): Promise<Book>;

    findById(id: number): Promise<Book>;
}