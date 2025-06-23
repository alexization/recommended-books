import {PostRepositoryInterface} from "./interfaces/PostRepositoryInterface";
import {DatabaseConnection} from "../config/DatabaseConfig";
import {CountOfPostsPerUser} from "../domain/dto/PostDto";
import {AppError} from "../utils/AppError";
import {ErrorMessage} from "../utils/ErrorMessage";

export class PostRepository implements PostRepositoryInterface {

    private readonly db: DatabaseConnection;

    constructor() {
        this.db = DatabaseConnection.getInstance();
    }

    async getCountOfPostsPerUserByMonth(year: number, month: number): Promise<CountOfPostsPerUser[]> {
        try {
            const query = `SELECT user_id, COUNT(*)
                           FROM posts
                           WHERE YEAR (created_at) = ? AND MONTH (created_at) = ?
                           GROUP BY user_id`;

            return await this.db.executeQuery<CountOfPostsPerUser[]>(query, [year, month]);

        } catch (error) {
            throw new AppError(ErrorMessage.UNEXPECTED_ERROR);
        }
    }
}

export const postRepository = new PostRepository();