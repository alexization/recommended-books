import {BookData} from "../domain/Book";

export interface ApiResponse {
    message: string;
    items: BookData[];
}

export interface BookServiceInterface {
    getBooks(pageNo: string | number): Promise<ApiResponse>;
}