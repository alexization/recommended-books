import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {NotFoundError, ValidationError} from "../utils/AppError";
import {User} from "../domain/User";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserRepository implements UserRepositoryInterface {
    private readonly dataFilePath: string;

    constructor() {
        this.dataFilePath = path.join(__dirname, '../../data/users.json');
        this.initialize();
    }

    async initialize(): Promise<void> {
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

    private async load(): Promise<UserData[]> {
        try {
            const data = await fs.readFile(this.dataFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error("데이터 로드 실패", error);
            return [];
        }
    }

    private async save(data: UserData[]): Promise<void> {
        try {
            await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("데이터 저장 실패", error);
        }
    }

    async createUser(createUserData: CreateUserData): Promise<User> {
        const users = await this.load();

        if (this.isEmailExists(users, createUserData.email)) {
            throw new ValidationError("이미 가입한 이메일입니다.");
        }

        let id = 1;
        if (users.length !== 0) {
            id = Math.max(...users.map(user => user.id)) + 1;
        }

        const newUser = User.create(id, createUserData);

        users.push(newUser);
        await this.save(users);

        return newUser;
    }

    async findUserById(id: number): Promise<UserData[]> {
        const users = await this.load();
        return users.filter(user => user.id === Number(id));
    }

    async findUserByEmail(email: string): Promise<UserData[]> {
        const users = await this.load();
        return users.filter(user => user.email === email);
    }

    async updateUser(userId: number, updateUserData: UpdateUserData): Promise<void> {
        const users = await this.load();

        const userData = users.find(user => user.id === Number(userId));

        if (userData === undefined) {
            throw new NotFoundError("해당 유저가 없습니다.");
        }

        const updateUser = User.fromJson(userData);
        updateUser.update(updateUserData);

        const userIndex = users.findIndex(user => user.id === Number(userId));
        users[userIndex] = updateUser.toJSON();

        await this.save(users);
    }

    async deleteUser(id: number): Promise<void> {
        const users = await this.load();
        const newUsers = users.filter(user => user.id !== Number(id));

        await this.save(newUsers);
    }

    isEmailExists(users: UserData[], email: string): boolean {
        const result = users.filter(user => user.email === email);

        return result.length !== 0;
    }
}

export const userRepository = new UserRepository();