import {Book} from "../../domain/Book";
import {CreateBookData} from "../../domain/dto/BookDto";

export interface BookRepositoryInterface {
    createBook(bookData: CreateBookData): Promise<void>;

    findBookById(id: number): Promise<Book>;
}