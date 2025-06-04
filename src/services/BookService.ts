import dotenv from 'dotenv';
import https from 'https';
import {AppError, BadRequestError} from "../utils/AppError";
import {BookServiceInterface} from "../interfaces/BookServiceInterface";
import {BookData} from "../domain/Book";

dotenv.config();

export class BookService implements BookServiceInterface {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = process.env.OPEN_API_BASE_URL as string;
    }

    async getBooks(pageNo: number): Promise<BookData[]> {
        try {
            const url = this.buildBookSearchUrl(pageNo);

            return await this.executeHttpRequest(url);
        } catch (error) {
            throw new AppError('API 호출 중 오류가 발생했습니다.', 500);
        }
    }

    buildBookSearchUrl(pageNo: number): string {
        const params = new URLSearchParams({
            numOfRows: '10', pageNo: pageNo.toString(),
        });
        return `${this.baseUrl}?serviceKey=${process.env.OPEN_API_SERVICE_KEY}&${params.toString()}`;
    }

    executeHttpRequest(url: string): Promise<BookData[]> {
        return new Promise((resolve, reject) => {
            const request = https.get(url, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    try {
                        if (response.statusCode === 200) {
                            const bookData: BookData[] = JSON.parse(data);
                            resolve(bookData);
                        } else {
                            reject(new BadRequestError('API 요청 실패'));
                        }
                    } catch (error) {
                        reject(new AppError('API 응답 파싱 실패'));
                    }
                });
            });

            request.on('error', (error) => {
                reject(new AppError(`네트워크 오류 ${error.message}`));
            });

            request.setTimeout(10000, () => {
                request.destroy();
                reject(new AppError('API 요청 시간 초과'));
            })
        });
    }
}

export const bookService = new BookService();