import {config} from '../config/Config.js';
import {readJsonFile, writeJsonFile} from "../utils/FileUtils.js";
import {User} from "../domain/User.js";
import {AppError} from "../utils/AppError.js";

export class UserRepository {
    constructor() {
        this.filePath = config.storage.dataDir;
        this.users = [];
    }

    /* 데이터 로드 */
    async initialize() {
        try {
            const userData = await readJsonFile(this.filePath);

            this.users = userData.map((data) => User.fromJSON(data));

        } catch (error) {
            throw new AppError("UserRepository 데이터 로드 실패", error.message);
        }
    }

    async save() {
        try {
            const userData = this.users.map((user) => user.toJSON());
            await writeJsonFile(this.filePath, userData);

        } catch (error) {
            throw new AppError("데이터 저장 실패", error.message);
        }
    }
}

export const userRepository = new UserRepository();