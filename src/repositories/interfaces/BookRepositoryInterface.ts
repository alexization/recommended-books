import {Book} from "../../domain/Book";

export interface BookRepositoryInterface {
    findBookById(id: number): Promise<Book>;
}