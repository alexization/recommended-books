import {AppError} from "../exception/AppError";
import {User} from "../domain/aggregates/User";
import {UserRepositoryInterface} from "./interfaces/UserRepositoryInterface";
import {CountOfPostsPerUser, UserData} from "../domain/dto/UserDto.js";
import {ErrorMessage} from "../exception/ErrorMessage";
import {DatabaseConnection} from "../config/DatabaseConfig.js";
import {Grade} from "../domain/enums/Grade";

export class UserRepository implements UserRepositoryInterface {
    private db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async save(user: User): Promise<void> {
        const data = user.toPersistence();

        try {
            if (data.user_id === 0) {
                const query = `INSERT INTO users (email, password, name, birth, grade, updated_at, created_at)
                               VALUES (?, ?, ?, ?, ?, ?, ?)`;

                await this.db.executeQuery(query, [data.email, data.password, data.name, data.birth, data.grade, data.updated_at, data.created_at]);

            } else {
                const query = `UPDATE users
                               SET name       = ?,
                                   birth      = ?,
                                   password   = ?,
                                   grade      = ?,
                                   updated_at = ?
                               WHERE id = ?`;

                await this.db.executeQuery(query, [data.name, data.birth, data.password, data.grade, data.updated_at]);
            }
        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findById(id: number): Promise<User | null> {
        try {
            const query = `SELECT *
                           FROM users
                           WHERE user_id = ?`;

            const userData = await this.db.executeQuery<UserData[]>(query, [id]);

            if (userData.length === 0) return null;

            return User.fromJson(userData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const query = `SELECT *
                           FROM users
                           WHERE email = ?`;

            const userData = await this.db.executeQuery<UserData[]>(query, [email]);

            if (userData.length === 0) return null;

            return User.fromJson(userData[0]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const query = `DELETE
                           FROM users
                           WHERE id = ?`;

            await this.db.executeQuery(query, [id]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            const query = `SELECT COUNT(*) as count
                           FROM users
                           WHERE email = ?`;

            const rows = await this.db.executeQuery<{ count: number }[]>(query, [email]);

            return rows[0].count !== 0;

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }

    async findUsersWithPostCounts(baseDate: string): Promise<CountOfPostsPerUser[]> {
        try {
            const query = `SELECT users.user_id, (COUNT(post_id)) as number_of_posts
                           FROM users
                                    LEFT JOIN posts ON users.user_id = posts.user_id AND
                                                       DATE_FORMAT(posts.created_at, '%Y-%m') = ?
                           GROUP BY users.user_id`;

            return await this.db.executeQuery<CountOfPostsPerUser[]>(query, [baseDate]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }


    async updateUsersGrade(userIds: number[], grade: Grade): Promise<void> {
        try {
            const placeholders = userIds.map(() => '?').join(',');

            const query = `UPDATE users
                           SET grade      = ?,
                               updated_at = ?
                           WHERE user_id IN (${placeholders})`;

            await this.db.executeQuery(query, [grade, new Date(), ...userIds]);

        } catch (error) {
            throw new AppError(ErrorMessage.DATABASE_ERROR);
        }
    }
}

export const userRepository = new UserRepository();