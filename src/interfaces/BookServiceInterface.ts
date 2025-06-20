import {BookData} from "../domain/dto/BookDto.js";

export interface BookServiceInterface {
    getRecentBooks(pageNo: number): Promise<BookData[]>;
}