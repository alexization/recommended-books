import {BookData} from "../domain/dto/BookDto";

export interface BookServiceInterface {
    getBooks(pageNo: string): Promise<BookData[]>;
}