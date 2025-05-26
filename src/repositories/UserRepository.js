import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {AppError} from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserRepository {
    constructor() {
        this.dataFilePath = path.join(__dirname, '../../data/users.json');
        this.initialize();
    }

    async initialize() {
        try {
            const dataDir = path.dirname(this.dataFilePath);
            await fs.mkdir(dataDir, {recursive: true});

            try {
                await fs.access(this.dataFilePath);
            } catch {
                await this.save([]);
            }
        } catch (error) {
            console.error("데이터 파일 초기화 실패: ", error);
        }
    }

    async load() {
        try {
            const data = await fs.readFile(this.dataFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("데이터 로드 실패", error);
            return [];
        }
    }

    async save(data) {
        try {
            await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("데이터 저장 실패", error);
        }
    }

    async create(userData) {
        const users = await this.load();

        if (this.isDuplicatedEmail(users, userData.email)) {
            throw new AppError("이미 가입한 이메일입니다.");
        }

        userData.id = 1;
        if (users.length !== 0) {
            userData.id = Math.max(...users.map(user => user.id)) + 1;
        }

        const newUser = {
            ...userData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        users.push(newUser);
        await this.save(users);
        return newUser;
    }

    async findUserById(id) {
        const users = await this.load();

        return users.filter(user => user.id === Number(id));
    }

    async findUserByEmail(email) {
        const users = await this.load();

        return users.filter(user => user.email === email);
    }

    isDuplicatedEmail(users, email) {
        const result = users.filter(user => user.email === email);

        return result.length !== 0;
    }
}

export const userRepository = new UserRepository();