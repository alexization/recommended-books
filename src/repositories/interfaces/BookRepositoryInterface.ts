import {Book} from "../../domain/Book";

export interface BookRepositoryInterface {
    createBook(book: Book): Promise<void>;

    findBookByTitleAndAuthor(title: string, author: string): Promise<Book>;

    findBookById(id: number): Promise<Book>;
}