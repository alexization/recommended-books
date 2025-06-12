import fs from 'fs/promises';
import path from 'path';
import {NotFoundError, ValidationError} from "../utils/AppError";
import {User} from "../domain/User";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";
import {ErrorMessage} from "../utils/ErrorMessage";

export class UserRepository implements UserRepositoryInterface {
    private readonly dataFilePath: string;

    constructor() {
        this.dataFilePath = path.join(process.cwd(), 'data', 'users.json');
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

    async createUser(createUserData: CreateUserData): Promise<User> {
        const users = await this.load();

        if (this.isEmailExists(users, createUserData.email)) {
            throw new ValidationError(ErrorMessage.USER_ALREADY_EXISTS);
        }

        let id = 1;
        if (users.length !== 0) {
            id = Math.max(...users.map(user => user.id)) + 1;
        }

        const newUser = await User.create(id, createUserData);

        users.push(newUser);
        await this.save(users);

        return newUser;
    }

    async findUserById(id: number): Promise<User> {
        const users = await this.load();
        const findUser = users.find(user => user.id === Number(id));

        if (findUser === undefined) {
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }

        return findUser;
    }

    async findUserByEmail(email: string): Promise<User> {
        const users = await this.load();
        const findUser = users.find(user => user.email === email);

        if (findUser === undefined) {
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }

        return findUser;
    }

    async updateUser(userId: number, updateUserData: UpdateUserData): Promise<void> {
        const users = await this.load();

        const updateUser = users.find(user => user.id === Number(userId));

        if (updateUser === undefined) {
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }

        updateUser.update(updateUserData);

        await this.save(users);
    }

    async deleteUser(id: number): Promise<void> {
        const users = await this.load();
        const newUsers = users.filter(user => user.id !== Number(id));

        await this.save(newUsers);
    }

    isEmailExists(users: User[], email: string): boolean {
        const result = users.filter(user => user.email === email);

        return result.length !== 0;
    }

    private async load(): Promise<User[]> {
        try {
            const data = await fs.readFile(this.dataFilePath, 'utf8');
            const jsonData = JSON.parse(data);

            return jsonData.map((userData: UserData) => User.fromJson(userData));
        } catch (error) {
            console.error("데이터 로드 실패", error);
            return [];
        }
    }

    private async save(data: User[]): Promise<void> {
        try {
            await fs.writeFile(this.dataFilePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("데이터 저장 실패", error);
        }
    }
}

export const userRepository = new UserRepository();