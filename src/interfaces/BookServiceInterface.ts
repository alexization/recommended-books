import {BookData} from "../domain/Book";

export interface BookServiceInterface {
    getBooks(pageNo: string): Promise<BookData[]>;
}