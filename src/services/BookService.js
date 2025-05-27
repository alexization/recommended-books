import dotenv from 'dotenv';
import https from 'https';
import {AppError, BadRequestError} from "../utils/AppError.js";

dotenv.config();

export class BookService {

    constructor() {
        this.baseUrl = process.env.OPEN_API_BASE_URL;
    }

    async getBooks(options) {
        try {
            const {numOfRows, pageNo} = options;
            const serviceKey = process.env.OPEN_API_SERVICE_KEY;
            const url = this.buildApiUrl(serviceKey, numOfRows, pageNo);

            return await this.makeApiRequest(url);
        } catch (error) {
            console.error(error);
            throw new AppError('API 호출 중 오류가 발생했습니다.', 500);
        }
    }

    buildApiUrl(serviceKey, numOfRows, pageNo) {
        const params = new URLSearchParams({
            numOfRows: numOfRows.toString(), pageNo: pageNo.toString(),
        });
        return `${this.baseUrl}?serviceKey=${serviceKey}&${params.toString()}`;
    }

    makeApiRequest(url) {
        return new Promise((resolve, reject) => {
            const request = https.get(url, (response) => {
                let data = '';

                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    try {
                        if (response.statusCode === 200) {
                            const jsonData = JSON.parse(data);
                            resolve(jsonData);
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