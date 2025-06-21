import {BookData} from "../domain/dto/BookDto.js";

export interface BookServiceInterface {
    getRecentBooks(pageNo: number): Promise<BookData[]>;

    getBooksByTitle(pageNo: number, title: string): Promise<BookData[]>;
}