import {Book} from "../../domain/Book";
import {CreateBookData} from "../../domain/dto/BookDto";

export interface BookRepositoryInterface {
    createBook(bookData: CreateBookData): Promise<void>;

    findBookByTitleAndAuthor(title: string, author: string): Promise<Book>;

    findBookById(id: number): Promise<Book>;
}