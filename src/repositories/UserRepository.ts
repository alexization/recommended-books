import fs from 'fs/promises';
import {AppError, NotFoundError, ValidationError} from "../utils/AppError";
import {User} from "../domain/User";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto";
import {ErrorMessage} from "../utils/ErrorMessage";
import {DatabaseConnection} from "../config/DatabaseConfig";

export class UserRepository implements UserRepositoryInterface {
    private db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async createUser(createUserData: CreateUserData): Promise<boolean> {

        if (await this.isEmailExists(createUserData.email)) {
            throw new ValidationError(ErrorMessage.USER_ALREADY_EXISTS);
        }

        const newUser = await User.create(0, createUserData);

        try {
            const query = `INSERT users (email, password, name, birth, updated_at, created_at) VALUES(?,?,?,?,?,?)`;

            await this.db.executeQuery(query, [newUser.email, newUser.password, newUser.name, newUser.birth, newUser.updatedAt, newUser.createdAt]);

            return true;

        } catch (error) {
            console.error("사용자 생성 중 오류", error);
            throw new AppError(ErrorMessage.UNEXPECTED_ERROR);
        }
    }

    async findUserById(id: number): Promise<User> {

        try {
            const query = `SELECT *
                           FROM users
                           WHERE id = ?`;

            return await this.db.executeQuery<User>(query, [id]);

        } catch (error) {
            console.error("사용자 조회 중 오류", error);
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            const query = `SELECT *
                           FROM users
                           WHERE email = ?`;

            const userData = await this.db.executeQuery<UserData[]>(query, [email]);

            return User.fromJson(userData[0]);

        } catch (error) {
            console.error("사용자 조회 중 오류", error);
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }
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

    async isEmailExists(email: string): Promise<boolean> {
        try {
            const query = `SELECT COUNT(*) as count
                           FROM users
                           WHERE email = ?`;

            const rowCounts = await this.db.executeQuery<bigint>(query, [email]);

            return rowCounts !== 0n;

        } catch (error) {
            console.error("이메일 중복 확인 중 오류", error);
            return false;
        }
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