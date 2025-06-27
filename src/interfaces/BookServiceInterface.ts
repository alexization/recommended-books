import {BookData} from "../domain/dto/BookDto.js";

export interface BookServiceInterface {
    getBooks(pageNo: number): Promise<BookData[]>;
}