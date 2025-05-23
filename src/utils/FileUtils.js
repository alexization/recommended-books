import {promises as fs} from 'fs';
import {AppError} from "./AppError.js";
import {dirname} from 'path';

export async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');

        if (data.trim() === '') {
            return [];
        }
        return JSON.parse(data);

    } catch (error) {
        throw new AppError("JSON 파일 읽기 실패 ", error.message);
    }
}

export async function writeJsonFile(filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonString, 'utf8');

    } catch (error) {
        throw new AppError("JSON 파일 쓰기 실패", error.message);
    }
}