import {AppError, NotFoundError, ValidationError} from "../utils/AppError.js";
import {User} from "../domain/User.js";
import {UserRepositoryInterface} from "./interfaces/UserRepositoryInterface";
import {CountOfPostsPerUser, CreateUserData, UpdateUserData, UserData} from "../domain/dto/UserDto.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";
import {DatabaseConnection} from "../config/DatabaseConfig.js";
import {Grade} from "../domain/enums/Grade";

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
            const query = `INSERT INTO users (email, password, name, birth, grade, updated_at, created_at)
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;

            await this.db.executeQuery(query, [newUser.email, newUser.password, newUser.name, newUser.birth, newUser.grade, newUser.updatedAt, newUser.createdAt]);

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
                           WHERE user_id = ?`;

            const userData = await this.db.executeQuery<UserData[]>(query, [id]);

            return User.fromJson(userData[0]);

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
        try {
            const query = `UPDATE users
                           SET name       = ?,
                               birth      = ?,
                               updated_at = ?
                           WHERE id = ?`;

            await this.db.executeQuery(query, [updateUserData.name, updateUserData.birth, new Date(), userId]);

        } catch (error) {
            console.error("사용자 정보 수정 중 오류", error);
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM users
                           WHERE id = ?`;

            await this.db.executeQuery(query, [id]);

        } catch (error) {
            console.error("사용자 정보 삭제 중 오류", error);
        }
    }

    async isEmailExists(email: string): Promise<boolean> {
        try {
            const query = `SELECT COUNT(*) as count
                           FROM users
                           WHERE email = ?`;

            const rows = await this.db.executeQuery<{ count: bigint }[]>(query, [email]);

            return rows[0].count !== 0n;

        } catch (error) {
            console.error("이메일 중복 확인 중 오류", error);
            return false;
        }
    }

    async getCountOfPostsPerUserByMonth(baseDate: string): Promise<CountOfPostsPerUser[]> {
        try {
            const query = `SELECT users.user_id, (COUNT(post_id) + 0) as number_of_posts
                           FROM users
                                    LEFT JOIN posts ON users.user_id = posts.user_id AND
                                                       DATE_FORMAT(posts.created_at, '%Y-%m') = ?
                           GROUP BY users.user_id`;

            return await this.db.executeQuery<CountOfPostsPerUser[]>(query, [baseDate]);

        } catch (error) {
            throw new AppError(ErrorMessage.UNEXPECTED_ERROR);
        }
    }


    async updateUserGrade(userIds: number[], grade: Grade): Promise<void> {
        try {
            const placeholders = userIds.map(() => '?').join(',');
            console.log(placeholders);
            const query = `UPDATE users
                           SET grade      = ?,
                               updated_at = ?
                           WHERE user_id IN (${placeholders})`;

            await this.db.executeQuery(query, [grade, new Date(), ...userIds]);

        } catch (error) {
            throw new AppError(ErrorMessage.UNEXPECTED_ERROR);
        }
    }
}

export const userRepository = new UserRepository();