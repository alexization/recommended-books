import {BookData} from "../domain/Book";

export interface BookServiceInterface {
    getBooks(pageNo: number): Promise<BookData[]>;
}